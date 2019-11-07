const i18n = require('i18n');


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: true,
        menu: 'i18n/LocalizedLabel'
    },

    properties: {
        textKey: {
            get () {
                return this._dataID;
            },
            set (val) {
                if (this._dataID !== val) {
                    this._dataID = val;
                    if (CC_EDITOR) {
                        this._debouncedUpdateLabel();
                    } else {
                        this.updateLabel();
                    }
                }
            }
        },

        localizedString: {
            override: true,
            tooltip: 'Here shows the localized string of Text Key',
            get: function () {
                return i18n.t(this.textKey);
            },
            set: function (value) {
                this.textKey = value;
                if (CC_EDITOR) {
                    cc.warn('Please set label text key in Text Key property.');
                }
            }
        },
        
        _dataID: ''
    },
    
    onLoad () {
        if(CC_EDITOR) {
            this._debouncedUpdateLabel = debounce(this.updateLabel, 200);
        }
        // if (!i18n.inst) {
        //     i18n.init();
        // }
        // cc.log('dataID: ' + this.dataID + ' value: ' + i18n.t(this.dataID));
        this.fetchRender();
    },

    fetchRender () {
        let label = this.getComponent(cc.Label);
        if (label) {
            this.label = label;
            this.updateLabel();
            return;
        } 
    },

    updateLabel () {
        if (!this.label) {
            cc.error('Failed to update localized label, label component is invalid!');
            return;
        }
        let localizedString = i18n.t(this.textKey);
        if (localizedString) {
            this.label.string = i18n.t(this.textKey);
        }
    }
});


// const i18n = require('i18n');


// cc.Class({
//     extends: cc.Component,

//     properties: {
//         textKey: {
//             default: 'TEXT_KEY',
//             multiline: true,
//             tooltip: 'Enter i18n key here',
//             notify: function () {
//                 this.string = this.localizedString;
//             }
//         },
//         localizedString: {
//             override: true,
//             tooltip: 'Here shows the localized string of Text Key',
//             get: function () {
//                 return i18n.t(this.textKey);
//             },
//             set: function (value) {
//                 this.textKey = value;
//                 if (CC_EDITOR) {
//                     cc.warn('Please set label text key in Text Key property.');
//                 }
//             }
//         },
//     },

//     onLoad () {
//         if (this.localizedString) {
//             this.string = this.localizedString;
//             let label = this.getComponent(cc.Label)
//             label.string = this.localizedString
//         }
//     }
// });
