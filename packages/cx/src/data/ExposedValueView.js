import {View} from './View';
import {Binding} from './Binding';

export class ExposedValueView extends View {

   getData() {
      if (this.cache.durable && this.meta.version === this.cache.version && this.cache.key === this.key)
         return this.cache.result;

      let data = this.store.getData();
      let container = this.containerBinding.value(data) || {};
      let record = container[this.key];

      this.cache.version = this.meta.version;
      this.cache.key = this.key;
      this.cache.durable = this.immutable || this.store.sealed;
      this.cache.result = this.immutable || this.store.sealed ? {...data} : data;
      this.cache.result[this.recordName] = record;
      return this.cache.result;
   }

   setKey(key) {
      this.key = key;
   }

   getKey() {
      return this.key;
   }

   setItem(path, value) {
      if (path == this.recordName || path.indexOf(this.recordName + '.') == 0) {
         var data = this.getData();
         var d = Binding.get(path).set(data, value);
         if (d != data) {
            var container = this.containerBinding.value(d);
            var record = d[this.recordName];
            var newContainer = Object.assign({}, container);
            newContainer[this.key] = record;
            this.store.setItem(this.containerBinding.path, newContainer);
         }
      } else {
         this.store.setItem(path, value);
      }
   }

   deleteItem(path) {
      var data, container, newContainer;

      if (path == this.recordName) {
         data = this.getData();
         container = this.containerBinding.value(data);
         if (!container.hasOwnProperty(path))
            return false;
         newContainer = Object.assign({}, container);
         delete newContainer[this.key];
         this.store.set(this.containerBinding.path, newContainer);
      }
      else if (path.indexOf(this.recordName + '.') == 0) {
         data = this.getData();
         var d = Binding.get(path).delete(data);
         if (d != data) {
            container = this.containerBinding.value(d);
            var record = d[this.recordName];
            newContainer = Object.assign({}, container);
            newContainer[this.key] = record;
            this.store.setItem(this.containerBinding.path, newContainer);
         }
      } else {
         this.store.deleteItem(path);
      }
   }
}

ExposedValueView.prototype.immutable = false;
