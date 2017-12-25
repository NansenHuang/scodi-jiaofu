import Actions from 'src/config/action-type';

const Tree = [
    {
        title: '路线生成',
        expand: true,
        children: [
            {
                title: '区段',
                expand: true,
                children: [
                    {
                        title: '施工区段',
                        key: 'Section',
                        fileName: 'Section',
                        action: Actions.LoadConstructionSection,
                    },
                ]
            },
            {
                title: '路线',
                expand: true,
                children: [
                    {
                        title: '路线',
                        key: 'Alignment',
                        fileName: 'Alignment',
                        action: Actions.LoadAlignment,
                    },
                    {
                        title: '区段路线',
                        key: 'Blignment',
                        fileName: 'Blignment',
                        action: Actions.LoadBlignment,
                    },
                    {
                        title: '道路',
                        key: 'Clignment',
                        fileName: 'Clignment',
                        action: Actions.LoadClignment,
                    },
                    {
                        title: '断链',
                        key: 'Chain',
                        fileName: 'Chain',
                        action: Actions.LoadChain,
                    },
                    {
                        title: '互通',
                        key: 'Interchange',
                        fileName: 'Interchange',
                        action: Actions.LoadInterchange,
                    },
                    {
                        title: '服务区',
                        key: 'Servicearea',
                        fileName: 'ServiceArea',
                        action: Actions.LoadServicearea,
                    },
                    {
                        title: '停车区',
                        key: 'Parkinglot',
                        fileName: 'ParkingArea',
                        action: Actions.LoadParkinglot,
                    },
                    {
                        title: '挡墙',
                        key: 'Guardwall',
                        fileName: 'Guardwall',
                        action: Actions.LoadGuardwall,
                    },
                    {
                        title: '边沟盲沟',
                        key: 'SideBlinddrain',
                        fileName: 'SideBlinddrain',
                        action: Actions.LoadSideBlinddrain,
                    },
                    {
                        title: '交界盲沟',
                        key: 'CrossBlinddrain',
                        fileName: 'CrossBlinddrain',
                        action: Actions.LoadCrossBlinddrain,
                    },
                    {
                        title: '软基处理',
                        key: 'Softbase',
                        fileName: 'Softbase',
                        action: Actions.LoadSoftbase,
                    },
                ]
            },
            {
                title: '结构物',
                expand: true,
                children: [
                    {
                        title: '桥梁',
                        key: 'Bridge',
                        fileName: 'Bridge',
                        action: Actions.LoadBridge,
                    },
                    {
                        title: '地质',
                        key: 'Geology',
                        fileName: 'Geology',
                        action: Actions.LoadGeology,
                    },
                    {
                        title: '隧道',
                        key: 'Tunnel',
                        fileName: 'Tunnel',
                        action: Actions.LoadTunnel,
                    },
                    {
                        title: '涵洞',
                        key: 'Culvert',
                        fileName: 'Culvert',
                        action: Actions.LoadCulvert,
                    },
                    {
                        title: '天桥',
                        key: 'Overbridge',
                        fileName: 'Overbridge',
                        action: Actions.LoadOverbridge,
                    },
                ]
            },
        ]
    },
    {
        title: '建模',
        expand: true,
        children: [
            {
                title: '桥梁',
                key: 'Bridge_Model',
                fileName: 'Bridge_Model',
                action: Actions.LoadBridge,
            },
        ]
    },
];

export default Tree;
