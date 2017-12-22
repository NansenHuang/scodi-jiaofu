<style lang="less">
</style>

<template>
    <div>
        <Upload :before-upload="handleUpload" action="">
            <Button type="ghost" icon="ios-cloud-upload-outline">浏览文件...</Button>
        </Upload>
        <div v-if="files.length">
            <div v-for="(file, index) in files" :key="index">
                {{file.localName + '  上传状态：' + (file.uploaded ? '已上传' : '未上传')}}
                <Button size="small" :loading="file.uploading" @click="()=>{uploadFile(file)}" :disabled="file.uploaded">上传</Button>
                {{file.failed ? '上传失败' : ''}}
            </div>
        </div>
    </div>
</template>

<script>
import Services from 'src/services';
import Cookies from 'js-cookie';

export default {
    name: 'NewFile',
    components: {},
    props: {
        active: {
            type: Boolean,
            required: true,
        },
        value: {
            required: true,
        },
        params: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            files: [],
        };
    },
    computed: {
        uploadedFiles: function () {
            return this.files.filter(item => item.uploaded).map(item => item.remoteName);
        },
    },
    watch: {
        uploadedFiles: function () {
            if (this.uploadedFiles.length && this.active) {
                this.$emit('input', this.uploadedFiles.join(','));
            };
        },
        active: function (val) {
            if (val) {
                ;
            } else {
                this.files = [];
            };
        },
    },
    created: function () {},
    methods: {
        handleUpload: function (file) {
            Services.Storage.getUploadUrl(Cookies.get('project'), this.params.fileType, file.name).then((resp) => {
                this.files.push({
                    fileObject: file,
                    localName: file.name,
                    remoteName: resp.name,
                    uploaded: false,
                    uploading: false,
                    failed: false,
                    url: resp.uri,
                });
            });
            return false;
        },
        uploadFile: function (fileInfo) {
            fileInfo.uploading = true;
            fileInfo.failed = false;
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', fileInfo.url, true);
            xhr.send(fileInfo.fileObject);
            // xhr.onprogress = () => {
            //     console.log('upload progress: ', arguments);
            // }
            xhr.onload = () => {
                fileInfo.uploading = false;
                if (xhr.status === 200) {
                    fileInfo.uploaded = true;
                } else {
                    fileInfo.failed = true;
                    fileInfo.uploaded = false;
                };
            };
        }
    },
};
</script>
