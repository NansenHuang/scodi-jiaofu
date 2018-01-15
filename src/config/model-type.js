'use strict';

import Type from './type';

export default {
    [Type.LuMian]: {
        LM1: 'LM-1', // 路面1层
        LM2: 'LM-2', // 路面2层
        LM3: 'LM-3', // 路面3层
        LM4: 'LM-4', // 路面4层
        LM5: 'LM-5', // 路面5层
        LM6: 'LM-6', // 路面6层
    },
    [Type.LuJian]: {
        LuJian: 'LUJIAN', // 路肩
    },
    [Type.BiaoXian]: {
        BiaoXian: 'BX', // 标线
    },
    [Type.FenGeDai]: {
        FenGeDai: 'FGD', // 分隔带
    },
    [Type.DangQiang]: {
        LuDiQiang: 'LDQ', // 路堤墙
        LuJianQiao: 'LJQ', // 路肩墙
        LuQianQiang: 'LQQ', // 路嵌墙
    },
    [Type.Rjht]: {
        RJHT: 'RJHT', // 软基换填
    },
    [Type.MangGou]: {
        JiaoJieMangGou: 'JJMG', // 交界盲沟
        BianGouMangGou: 'BGMG', // 边坡盲沟
    },
    [Type.BianGou]: {
        BianGou: 'BG', // 边沟
    },
    [Type.BianPo]: {
        TF1: 'TF-1', // 填方1级
        TFPT1: 'TFPT-1', // 填方平台1级
        TF2: 'TF-2', // 填方2级
        TFPT2: 'TFPT-2', // 填方平台2级
        TF3: 'TF-3', // 填方3级
        TFPT3: 'TFPT-3', // 填方平台3级
        TF4: 'TF-4', // 填方4级
        TFPT4: 'TFPT-4', // 填方平台4级
        TF5: 'TF-5', // 填方5级
        TFPT5: 'TFPT-5', // 填方平台5级
        TF6: 'TF-6', // 填方6级
        TFPT6: 'TFPT-6', // 填方平台6级
        TF7: 'TF-7', // 填方7级
        TFPT7: 'TFPT-7', // 填方平台7级
        TF8: 'TF-8', // 填方8级
        TFPT8: 'TFPT-8', // 填方平台8级
        BianGouFangPo: 'BGFP', // 路肩

        WF1: 'WF-1', // 挖方1级
        WFPT1: 'WFPT-1', // 挖方平台1级
        WF2: 'WF-2', // 挖方2级
        WFPT2: 'WFPT-2', // 挖方平台2级
        WF3: 'WF-3', // 挖方3级
        WFPT3: 'WFPT-3', // 挖方平台3级
        WF4: 'WF-4', // 挖方4级
        WFPT4: 'WFPT-4', // 挖方平台4级
        WF5: 'WF-5', // 挖方5级
        WFPT5: 'WFPT-5', // 挖方平台5级
        WF6: 'WF-6', // 挖方6级
        WFPT6: 'WFPT-6', // 挖方平台6级
        WF7: 'WF-7', // 挖方7级
        WFPT7: 'WFPT-7', // 挖方平台7级
        WF8: 'WF-8', // 挖方8级
        WFPT8: 'WFPT-8', // 挖方平台8级
    },
    [Type.HongXian]: {
        HONGXIAN: 'HONGXIAN', // 征地红线
    },
    [Type.BiaoPai]: {
        BIAOPAI: 'BIAOPAI', // 标牌
    },
    [Type.DiZhi]: {
        DIZHI: 'DIZHI', // 地质
    },
    [Type.Qiao]: {
        QiaoDun: 'QiaoDun', // 桥墩
        Zhuang: 'Zhuang', // 桥桩
        XiLiang: 'XiLiang', // 系梁
        HuLan: 'HL', // 桥梁护栏
        GaiLiang: 'GaiLiang', // 盖梁
        SiJieFeng: 'SiJieFeng', // 湿接缝
        TLiang: 'TLiang', // T梁
        QiaoTai: 'QiaoTai', // 桥台
        ChengTai: 'ChengTai', // 承台
        KongXinFangDun: 'KongXinFangDun', // 空心薄壁墩
        DunXiLiang: 'DunXiLiang', // 墩系梁
        DiXiLiang: 'DiXiLiang', // 地系梁
    },
    [Type.SuiDao]: {
        SuiDaoZG: 'zg', //  主洞拱墙
        SuiDaoZY: 'zy', //  主洞仰拱
        SuiDaoZF: 'zf', //  主洞防水层
        SuiDaoZC: 'zc', //  主洞拱墙初喷
        SuiDaoZD: 'zd', //  主洞仰拱初喷
        SuiDaoZL: 'zl', //  主洞电缆沟
        SuiDaoZP: 'zp', //  主洞中央排水沟
        SuiDaoZH: 'zh', //  主洞仰拱回填
        SuiDaoTG: 'tg', //  停车带拱墙
        SuiDaoTY: 'ty', //  停车带仰拱
        SuiDaoTF: 'tf', //  停车带防水层
        SuiDaoTC: 'tc', //  停车带拱墙初喷
        SuiDaoTD: 'td', //  停车带仰拱初喷
        SuiDaoTL: 'tl', //  停车带电缆沟
        SuiDaoTP: 'tp', //  停车带中央排水沟
        SuiDaoTH: 'th', //  停车带仰拱回填
        SuiDaoTT: 'tt', //  停车带挡头墙
        SuiDaoCG: 'cg', //  车行横洞二衬拱墙
        SuiDaoCY: 'cy', //  车行横洞二衬仰拱
        SuiDaoCF: 'cf', //  车行横洞二衬防水层
        SuiDaoCC: 'cc', //  车行横洞拱墙初喷
        SuiDaoCD: 'cd', //  车行横洞仰拱初喷
        SuiDaoCH: 'ch', //  车行横洞仰拱回填
        SuiDaoCP: 'cp', //  车行横洞平台
        SuiDaoRG: 'rg', //  人行横洞二衬拱墙
        SuiDaoRY: 'ry', //  人行横洞二衬仰拱
        SuiDaoRF: 'rf', //  人行横洞二衬防水层
        SuiDaoRC: 'rc', //  人行横洞拱墙初喷
        SuiDaoRD: 'rd', //  人行横洞仰拱初喷
        SuiDaoRH: 'rh', //  人行横洞仰拱回填
    },
    [Type.HanDong]: {},
    [Type.TianQiao]: {},
};
