import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

export const consoleRouter = {
    path: '/console',
    name: 'console',
    meta: {
        title: '项目控制台'
    },
    component: resolve => { require(['../components/console'], resolve); }
};

export const initRouter = {
    path: '/init',
    name: 'init',
    meta: {
        title: '系统初始化',
    },
    component: resolve => { require(['../components/console/init.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['../components/summary/index.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'dwgviewer', title: '附件查看', name: 'dwgviewer', component: resolve => { require(['../components/coordinated-design/shared/dwgviewer.vue'], resolve); } },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve); } }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/design',
        icon: 'social-buffer',
        name: 'design',
        title: '设计协同',
        component: Main,
        children: [
            {
                path: 'section',
                icon: 'pound',
                name: 'design-section',
                title: '区段',
                component: resolve => { require(['../components/coordinated-design/section'], resolve); }
            },
            {
                path: 'alignment',
                icon: 'pound',
                name: 'design-alignment',
                title: '路线',
                component: resolve => { require(['../components/coordinated-design/alignment'], resolve); }
            },
            {
                path: 'structure',
                icon: 'pound',
                name: 'design-structure',
                title: '结构物',
                component: resolve => { require(['../components/coordinated-design/structure'], resolve); }
            },
            {
                path: 'imagery',
                icon: 'pound',
                name: 'design-imagery',
                title: '影像',
                // component: resolve => { require(['./components/coordinated-design/section/design-section.vue'], resolve); }
            },
            {
                path: 'elevation',
                icon: 'pound',
                name: 'design-elevation',
                title: '地形',
                // component: resolve => { require(['./components/coordinated-design/section/design-section.vue'], resolve); }
            },
            {
                path: 'export',
                icon: 'share',
                name: 'table-export',
                title: '表格导出',
                component: resolve => { require(['../components/others/export'], resolve); }
            },
            {
                path: 'publish',
                icon: 'upload',
                name: 'publish-data',
                title: '数据发布',
                component: resolve => { require(['../components/others/publish'], resolve); }
            },
        ],
    },
    {
        path: '/data',
        icon: 'social-buffer',
        name: 'data',
        title: '数据资料',
        component: Main,
        children: [
            {
                path: 'design',
                icon: 'pound',
                name: 'design-data',
                title: '设计资料',
                component: resolve => { require(['../components/data/design'], resolve); }
            },
            {
                path: 'test2',
                icon: 'pound',
                name: 'data-test2',
                title: '占位',
                // component: resolve => { require(['./components/coordinated-design/section/design-section.vue'], resolve); }
            },
        ],
    },
    {
        path: '/publish',
        icon: 'social-buffer',
        name: 'publish',
        title: '发布系统',
        component: Main,
        children: [
            {
                path: 'test',
                icon: 'pound',
                name: 'publish-test',
                title: '占位',
                // component: resolve => { require(['./components/coordinated-design/section/design-section.vue'], resolve); }
            },
            {
                path: 'test2',
                icon: 'pound',
                name: 'publish-test2',
                title: '占位',
                // component: resolve => { require(['./components/coordinated-design/section/design-section.vue'], resolve); }
            },
        ],
    },
    // remove
    /**
    {
        path: '/section',
        icon: 'social-buffer',
        name: 'section',
        title: '区段划分',
        component: Main,
        children: [
            {
                path: 'design',
                icon: 'pound',
                name: 'section_design',
                title: '设计标段',
                component: resolve => { require(['./components/coordinated-design/section/design-section.vue'], resolve); }
            },
            {
                path: 'construction',
                icon: 'pound',
                name: 'section_construction',
                title: '施工标段',
                component: resolve => { require(['./components/coordinated-design/section/construction-section.vue'], resolve); }
            },
            {
                path: 'custom',
                icon: 'pound',
                name: 'section_custom',
                title: '自定义标段',
                component: resolve => { require(['./components/coordinated-design/section/custom-section.vue'], resolve); }
            }
        ]
    },
    {
        path: '/alignment',
        icon: 'social-buffer',
        name: 'alignment',
        title: '路线',
        component: Main,
        children: [
            {
                path: 'index',
                icon: 'pound',
                name: 'alignment_index',
                title: '路线',
                component: resolve => { require(['./components/coordinated-design/alignment/alignment.vue'], resolve); }
            },
            {
                path: 'chain',
                icon: 'pound',
                name: 'alignment_chain',
                title: '断链',
                component: resolve => { require(['./components/coordinated-design/alignment/chain.vue'], resolve); }
            }
        ]
    },
    {
        path: '/roadbed',
        icon: 'social-buffer',
        name: 'roadbed',
        title: '路基',
        component: Main,
        children: [
            {
                path: 'road',
                icon: 'pound',
                name: 'roadbed_road',
                title: '道路',
                component: resolve => { require(['./components/coordinated-design/road/roadbed.vue'], resolve); }
            },
            {
                path: 'design',
                icon: 'pound',
                name: 'roadbed_design',
                title: '设计信息',
                component: resolve => { require(['./components/coordinated-design/road/design.vue'], resolve); }
            }
        ]
    },
    {
        path: '/structure',
        icon: 'social-buffer',
        name: 'structure',
        title: '结构物',
        component: Main,
        children: [
            {
                path: 'test1',
                icon: 'pound',
                name: 'structure_test1',
                title: '占位',
                component: resolve => { require(['./views/my_components/file-upload/file-upload.vue'], resolve); }
            },
            {
                path: 'test2',
                icon: 'pound',
                name: 'structure_test2',
                title: '占位',
                component: resolve => { require(['./views/my_components/file-upload/file-upload.vue'], resolve); }
            }
        ]
    },
    {
        path: '/elevation',
        icon: 'social-buffer',
        name: 'elevation',
        title: '地形',
        component: Main,
        children: [
            {
                path: 'test1',
                icon: 'pound',
                name: 'elevation_test1',
                title: '占位',
                component: resolve => { require(['./views/my_components/file-upload/file-upload.vue'], resolve); }
            },
            {
                path: 'test2',
                icon: 'pound',
                name: 'elevation_test2',
                title: '占位',
                component: resolve => { require(['./views/my_components/file-upload/file-upload.vue'], resolve); }
            }
        ]
    },
    {
        path: '/imagery',
        icon: 'social-buffer',
        name: 'imagery',
        title: '影像',
        component: Main,
        children: [
            {
                path: 'test1',
                icon: 'pound',
                name: 'imagery_test1',
                title: '占位',
                component: resolve => { require(['./views/my_components/file-upload/file-upload.vue'], resolve); }
            },
            {
                path: 'test2',
                icon: 'pound',
                name: 'imagery_test2',
                title: '占位',
                component: resolve => { require(['./views/my_components/file-upload/file-upload.vue'], resolve); }
            }
        ]
    },
    */
    /**
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', title: '权限管理', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => { require(['@/views/access/access-test.vue'], resolve); } }
        ]
    },
    {
        path: '/international',
        icon: 'earth',
        title: {i18n: 'international'},
        name: 'international',
        component: Main,
        children: [
            { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: resolve => { require(['@/views/international/international.vue'], resolve); } }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        component: Main,
        children: [
            {
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: resolve => { require(['@/views/my-components/text-editor/text-editor.vue'], resolve); }
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: resolve => { require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve); }
            },
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: resolve => { require(['@/views/my-components/image-editor/image-editor.vue'], resolve); }
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: resolve => { require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve); }
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: resolve => { require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve); }
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: resolve => { require(['@/views/my-components/file-upload/file-upload.vue'], resolve); }
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                component: resolve => { require(['@/views/my-components/count-to/count-to.vue'], resolve); }
            }
            // {
            //     path: 'clipboard-page',
            //     icon: 'clipboard',
            //     name: 'clipboard-page',
            //     title: '一键复制',
            //     component: resolve => { require(['@/views/my-components/clipboard/clipboard.vue'], resolve); }
            // }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: Main,
        children: [
            { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: resolve => { require(['@/views/form/article-publish/article-publish.vue'], resolve); } },
            { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => { require(['@/views/form/work-flow/work-flow.vue'], resolve); } }

        ]
    },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: Main,
        children: [
            { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: resolve => { require(['@/views/tables/dragable-table.vue'], resolve); } },
            { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: resolve => { require(['@/views/tables/editable-table.vue'], resolve); } },
            { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: resolve => { require(['@/views/tables/searchable-table.vue'], resolve); } },
            { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: resolve => { require(['@/views/tables/exportable-table.vue'], resolve); } },
            { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: resolve => { require(['@/views/tables/table-to-image.vue'], resolve); } }
        ]
    },
    {
        path: '/advanced-router',
        icon: 'ios-infinite',
        name: 'advanced-router',
        title: '高级路由',
        component: Main,
        children: [
            { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: resolve => { require(['@/views/advanced-router/mutative-router.vue'], resolve); } },
            { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: resolve => { require(['@/views/advanced-router/argument-page.vue'], resolve); } }
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [
            { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
        ]
    }
    */
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    consoleRouter,
    initRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
