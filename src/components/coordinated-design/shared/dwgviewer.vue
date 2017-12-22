<!-- an editble, searchable and configurable table -->

<style lang="less">
</style>

<template>
    <div>
      <Card>
        <h4 slot="title">{{text}}</h4>
        <div style="height:300px;">{{attachments}}</div>
      </Card>
    </div>
</template>

<script>
import Field from 'src/config/field';
import { mapState } from 'vuex';

export default {
    name: 'dwgViewer',
    data () {
        return {
            text: 'DWG文件在线查看页面'
        };
    },
    computed: mapState({
        attachments: function (state) {
            let alignment = state.highway.alignment.alignment.filter(
                item => {
                    return item[Field.Alignment.EnName] === this.$route.query.alignment;
                }
            );
            return alignment[0][Field.Alignment.Attachments];
        },
    }),
    methods: {
    },
    watch: {
    }
};
</script>
