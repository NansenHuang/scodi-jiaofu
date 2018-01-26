const Field = {
    //
    Section: {
        Project: 'project',
        id: 'id',
        Name: 'name',
        SectionID: 'sectionID',
        LeftPart: 'leftParts',
        RightPart: 'rightPart',
    },
    //
    Alignment: {
        Project: 'project',
        id: 'id',
        OwerType: 'owerType',
        OwerID: 'owerID',
        OwerCnName: 'owerCnName',
        Direction: 'direction',
        EnName: 'alignmentEnName',
        CnName: 'alignmentCnName',
        StationMark: 'stationMark',
        StartStation: 'startStation',
        EndStation: 'endStation',
    },
    //
    Blignment: {
        Project: 'project',
        id: 'id',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        CnName: 'blignmentCnName',
        StationMark: 'stationMark',
        StartStation: 'startStation',
        EndStation: 'endStation',
        AlignmentFiles: 'alignmentFiles',
        CorridorFiles: 'corridorFiles',
    },
    Clignment: {
        Project: 'project',
        id: 'id',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        StationMark: 'stationMark',
        StartStation: 'startStation',
        EndStation: 'endStation',
        CorridorFiles: 'corridorFiles',
    },
    //
    Chain: {
        Project: 'project',
        id: 'id',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        config: 'config',
    },
    /**
    * SectionID、
    * LeftPart、RightPart、Desc、
    *
    * EnName、CnName、
    */
    Interchange: {
        Project: 'project',
        id: 'id',
        CnName: 'interchangeCnName',
        EnName: 'interchangeEnName',
        SectionID: 'sectionID',
        LeftPart: 'leftParts',
        RightPart: 'rightPart',
        Desc: 'desc',
    },
    Servicearea: {
        Project: 'project',
        id: 'id',
        CnName: 'serviceareaCnName',
        EnName: 'serviceareaEnName',
        SectionID: 'sectionID',
        LeftPart: 'leftParts',
        RightPart: 'rightPart',
        Desc: 'desc',
    },
    Parkinglot: {
        Project: 'project',
        id: 'id',
        CnName: 'stopCnName',
        EnName: 'stopEnName',
        SectionID: 'sectionID',
        LeftPart: 'leftParts',
        RightPart: 'rightPart',
        Desc: 'desc',
    },
    /**
    * SectionID、
    * Part、Desc、
    * BimFiles、
    */
    Culvert: {
        Project: 'project',
        id: 'id',
        SectionID: 'sectionID',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        StationMark: 'stationMark',
        Station: 'station',
        StationChain: 'stationChain',
        Posture: 'posture',
        Desc: 'desc',
        BimFiles: 'bimFiles',
        //
        Angle: 'angle',
    },
    Overbridge: {
        Project: 'project',
        id: 'id',
        SectionID: 'sectionID',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        StationMark: 'stationMark',
        Station: 'station',
        StationChain: 'stationChain',
        Posture: 'posture',
        Desc: 'desc',
        BimFiles: 'bimFiles',
    },
    /**
    * SectionID、
    * LeftPart && RightPart || Part、Desc、
    *
    * BimFiles、
    * EnName、CnName、
    */
    Bridge: {
        Project: 'project',
        id: 'id',
        CnName: 'bridgeCnName',
        EnName: 'bridgeEnName',
        SectionID: 'sectionID',
        LeftPart: 'leftParts',
        RightPart: 'rightPart',
        Posture: 'posture',
        Desc: 'desc',
        BimFiles: 'bimFiles',
    },
    Geology: {
        Project: 'project',
        id: 'id',
        CnName: 'geologyCnName',
        EnName: 'geologyEnName',
        SectionID: 'sectionID',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        StationMark: 'stationMark',
        StartStation: 'startStation',
        StartStationChain: 'startStationChain',
        EndStation: 'endStation',
        EndStationChain: 'endStationChain',
        Desc: 'desc',
        BimFiles: 'bimFiles',
    },
    Tunnel: {
        Project: 'project',
        id: 'id',
        EnName: 'tunnelEnName',
        CnName: 'tunnelCnName',
        SectionID: 'sectionID',
        LeftPart: 'leftParts',
        RightPart: 'rightPart',
        Posture: 'posture',
        Desc: 'desc',
        BimFiles: 'bimFiles',
    },
    /**
    * SectionID、
    * Part、Desc、
    *
    * Type、ModelType、
    */
    Softbase: {
        Project: 'project',
        id: 'id',
        Type: 'type',
        ModelType: 'modelType',
        SectionID: 'sectionID',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        StationMark: 'stationMark',
        StartStation: 'startStation',
        EndStation: 'endStation',
        StartStationChain: 'startStationChain',
        EndStationChain: 'endStationChain',
        Desc: 'desc',
    },
    Guardwall: {
        Project: 'project',
        id: 'id',
        Type: 'type',
        ModelType: 'modelType',
        SectionID: 'sectionID',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        StationMark: 'stationMark',
        StartStation: 'startStation',
        EndStation: 'endStation',
        StartStationChain: 'startStationChain',
        EndStationChain: 'endStationChain',
        Desc: 'desc',
        //
        Direction: 'direction', // doubt?
    },
    SideBlinddrain: {
        Project: 'project',
        id: 'id',
        Type: 'type',
        ModelType: 'modelType',
        SectionID: 'sectionID',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        StationMark: 'stationMark',
        StartStation: 'startStation',
        EndStation: 'endStation',
        StartStationChain: 'startStationChain',
        EndStationChain: 'endStationChain',
        Desc: 'desc',
        //
        Direction: 'direction', // doubt?
    },
    CrossBlinddrain: {
        Project: 'project',
        id: 'id',
        Type: 'type',
        ModelType: 'modelType',
        SectionID: 'sectionID',
        AlignmentID: 'alignmentID',
        AlignmentCnName: 'alignmentCnName',
        StationMark: 'stationMark',
        StartStation: 'startStation',
        EndStation: 'endStation',
        StartStationChain: 'startStationChain',
        EndStationChain: 'endStationChain',
        Desc: 'desc',
        //
        Direction: 'direction', // doubt?
    },
};

export const SubField = {
    Chain: {
        config: {
            MeasureStation: 'measureStation',
            Station: 'station',
            Type: 'type',
            Length: 'length',
            SumLong: 'sumLong',
            SumShort: 'sumShort',
            SequentStation: 'sequentStation',
        },
    },
    Section: {
        LeftPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
        RightPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
    },
    Interchange: {
        LeftPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
        RightPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
    },
    Servicearea: {
        LeftPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
        RightPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
    },
    Parkinglot: {
        LeftPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
        RightPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
    },
    Bridge: {
        Posture: {
            x: 'x',
            y: 'y',
            z: 'z',
            alpha: 'alpha',
            beta: 'beta',
            gamma: 'gamma',
            scale: 'scale',
        },
        LeftPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
        RightPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
    },
    Culvert: {
        Posture: {
            x: 'x',
            y: 'y',
            z: 'z',
            alpha: 'alpha',
            beta: 'beta',
            gamma: 'gamma',
            scale: 'scale',
        },
    },
    Overbridge: {
        Posture: {
            x: 'x',
            y: 'y',
            z: 'z',
            alpha: 'alpha',
            beta: 'beta',
            gamma: 'gamma',
            scale: 'scale',
        },
    },
    Tunnel: {
        Posture: {
            x: 'x',
            y: 'y',
            z: 'z',
            alpha: 'alpha',
            beta: 'beta',
            gamma: 'gamma',
            scale: 'scale',
        },
        LeftPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
        RightPart: {
            AlignmentID: 'alignmentID',
            AlignmentCnName: 'alignmentCnName',
            StationMark: 'stationMark',
            StartStation: 'startStation',
            EndStation: 'endStation',
            StartStationChain: 'startStationChain',
            EndStationChain: 'endStationChain',
        },
    },
};

export default Field;
