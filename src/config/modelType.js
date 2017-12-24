'use strict';

export default class ModelType {

    static LM1 = 'LM-1'; // 路面1层
    static LM2 = 'LM-2'; // 路面2层
    static LM3 = 'LM-3'; // 路面3层
    static LM4 = 'LM-4'; // 路面4层
    static LM5 = 'LM-5'; // 路面5层
    static LM6 = 'LM-6'; // 路面6层

    static LuJian = 'LUJIAN'; // 路肩

    static BiaoXian = 'BX'; // 标线

    static FenGeDai = 'FGD'; // 分隔带

    static LuDiQiang = 'LDQ'; // 路堤墙
    static LuJianQiao = 'LJQ'; // 路肩墙
    static LuQianQiang = 'LQQ'; // 路嵌墙

    static RJHT = 'RJHT'; // 软基换填

    static JiaoJieMangGou = 'JJMG'; // 交界盲沟
    static BianGouMangGou = 'BGMG'; // 边坡盲沟

    static BianGou = 'BG'; // 边沟

    static TF1 = 'TF-1'; // 填方1级
    static TFPT1 = 'TFPT-1'; // 填方平台1级
    static TF2 = 'TF-2'; // 填方2级
    static TFPT2 = 'TFPT-2'; // 填方平台2级
    static TF3 = 'TF-3'; // 填方3级
    static TFPT3 = 'TFPT-3'; // 填方平台3级
    static TF4 = 'TF-4'; // 填方4级
    static TFPT4 = 'TFPT-4'; // 填方平台4级
    static TF5 = 'TF-5'; // 填方5级
    static TFPT5 = 'TFPT-5'; // 填方平台5级
    static TF6 = 'TF-6'; // 填方6级
    static TFPT6 = 'TFPT-6'; // 填方平台6级
    static TF7 = 'TF-7'; // 填方7级
    static TFPT7 = 'TFPT-7'; // 填方平台7级
    static TF8 = 'TF-8'; // 填方8级
    static TFPT8 = 'TFPT-8'; // 填方平台8级
    static BianGouFangPo = 'BGFP'; // 路肩

    static WF1 = 'WF-1'; // 挖方1级
    static WFPT1 = 'WFPT-1'; // 挖方平台1级
    static WF2 = 'WF-2'; // 挖方2级
    static WFPT2 = 'WFPT-2'; // 挖方平台2级
    static WF3 = 'WF-3'; // 挖方3级
    static WFPT3 = 'WFPT-3'; // 挖方平台3级
    static WF4 = 'WF-4'; // 挖方4级
    static WFPT4 = 'WFPT-4'; // 挖方平台4级
    static WF5 = 'WF-5'; // 挖方5级
    static WFPT5 = 'WFPT-5'; // 挖方平台5级
    static WF6 = 'WF-6'; // 挖方6级
    static WFPT6 = 'WFPT-6'; // 挖方平台6级
    static WF7 = 'WF-7'; // 挖方7级
    static WFPT7 = 'WFPT-7'; // 挖方平台7级
    static WF8 = 'WF-8'; // 挖方8级
    static WFPT8 = 'WFPT-8'; // 挖方平台8级
    static BianGouFangPo = 'BGFP'; // 边沟放坡

    static HONGXIAN = 'HONGXIAN'; // 征地红线
    static BIAOPAI = 'BIAOPAI'; // 标牌
    static DIZHI = 'DIZHI'; // 地质

    static QiaoDun = 'QiaoDun'; // 桥墩
    static Zhuang = 'Zhuang'; // 桥桩
    static XiLiang = 'XiLiang'; // 系梁
    static HuLan = 'HL'; // 桥梁护栏
    static GaiLiang = 'GaiLiang'; // 盖梁
    static SiJieFeng = 'SiJieFeng'; // 湿接缝
    static TLiang = 'TLiang'; // T梁
    static QiaoTai = 'QiaoTai'; // 桥台
    static ChengTai = 'ChengTai'; // 承台
    static KongXinFangDun = 'KongXinFangDun'; // 空心薄壁墩
    static DunXiLiang = 'DunXiLiang'; // 墩系梁
    static DiXiLiang = 'DiXiLiang'; // 地系梁

    static SuiDaoZG = 'zg'; //  主洞拱墙
    static SuiDaoZY = 'zy'; //  主洞仰拱
    static SuiDaoZF = 'zf'; //  主洞防水层
    static SuiDaoZC = 'zc'; //  主洞拱墙初喷
    static SuiDaoZD = 'zd'; //  主洞仰拱初喷
    static SuiDaoZL = 'zl'; //  主洞电缆沟
    static SuiDaoZP = 'zp'; //  主洞中央排水沟
    static SuiDaoZH = 'zh'; //  主洞仰拱回填
    static SuiDaoTG = 'tg'; //  停车带拱墙
    static SuiDaoTY = 'ty'; //  停车带仰拱
    static SuiDaoTF = 'tf'; //  停车带防水层
    static SuiDaoTC = 'tc'; //  停车带拱墙初喷
    static SuiDaoTD = 'td'; //  停车带仰拱初喷
    static SuiDaoTL = 'tl'; //  停车带电缆沟
    static SuiDaoTP = 'tp'; //  停车带中央排水沟
    static SuiDaoTH = 'th'; //  停车带仰拱回填
    static SuiDaoTT = 'tt'; //  停车带挡头墙
    static SuiDaoCG = 'cg'; //  车行横洞二衬拱墙
    static SuiDaoCY = 'cy'; //  车行横洞二衬仰拱
    static SuiDaoCF = 'cf'; //  车行横洞二衬防水层
    static SuiDaoCC = 'cc'; //  车行横洞拱墙初喷
    static SuiDaoCD = 'cd'; //  车行横洞仰拱初喷
    static SuiDaoCH = 'ch'; //  车行横洞仰拱回填
    static SuiDaoCP = 'cp'; //  车行横洞平台
    static SuiDaoRG = 'rg'; //  人行横洞二衬拱墙
    static SuiDaoRY = 'ry'; //  人行横洞二衬仰拱
    static SuiDaoRF = 'rf'; //  人行横洞二衬防水层
    static SuiDaoRC = 'rc'; //  人行横洞拱墙初喷
    static SuiDaoRD = 'rd'; //  人行横洞仰拱初喷
    static SuiDaoRH = 'rh'; //  人行横洞仰拱回填
}
