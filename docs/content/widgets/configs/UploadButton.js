import {Md} from '../../../components/Md';

export default {
   disabled: {
      type: 'boolean',
      description: <cx><Md>
         Set to `true` to disable the button.
      </Md></cx>
   },
   baseClass: {
      type: 'string',
      description: <cx><Md>
         Base CSS class to be applied to the element. Default is 'uploadbutton'.
      </Md></cx>
   },
    onUploadStarting: {
        type: 'function',
        key: true,
        description: <cx><Md>
            A callback function to validate files to be uploaded.
            Arguments:
            - `instance` - widget instance
            - `xhr` - instance of the XMLHttpRequest object to be used for upload
            - `file` - file to be uploaded
            - `formData` - FormData object to be sent containing the `file` object
        </Md></cx>
    },
    onUploadComplete: {
        type: 'function',
        key: true,
        description: <cx><Md>
            A callback function called when the upload is complete.
            Arguments:
            - `xhr` - instance of the XMLHttpRequest object used for upload
            - `instance` - widget instance
            - `file` - file to be uploaded
            - `formData` - FormData object to be sent containing the `file` object

            Check `status` and `responseText` of the `xhr` object to examine
            the server response.
        </Md></cx>
    },
    onUploadError: {
        type: 'function',
        key: true,
        description: <cx><Md>
            A callback function called in case of an upload error.
            Arguments:
            - `error` - error
            - `instance` - widget instance
        </Md></cx>
    },
    onResolveUrl: {
        type: 'function',
        key: true,
        description: <cx><Md>
            A callback function used to resolve dynamic upload URLs which are sometimes necessary for cloud uploads.
            Arguments:
            - `file` - instance of the File being uploaded
            - `instance` - widget instance

            Return value should be a string or a promise that resolves to a string.
        </Md></cx>
    },
    text: {
        type: 'string',
        description: <cx><Md>
            Text description.
        </Md></cx>
    }
};
