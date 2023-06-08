export interface Property {
    ContactSecureId2: string;
    Dups: Property[];
    IsOwn: boolean;
    Photos: string[];
    PriceChange: number;
    RsAgency: string;
    RsAgencyContactSecureId: number;
    RsArea: string;
    RsBaths: number;
    RsBathsTo: number;
    RsBeds: number;
    RsBedsTo: number;
    RsBuiltSqm: number;
    RsBuiltSqmTo: number;
    RsCommission: number;
    RsCommissionPct: number;
    RsCurrency: string;
    RsDimension: number;
    RsExId: string;
    RsGardenPlotSqm: number;
    RsGardenPlotSqmTo: number;
    RsId: number;
    RsLastUpdated: string;
    RsListDate: string;
    RsLocation: string;
    RsProvince: string;
    RsSalePrice: number;
    RsSalePriceTo: number;
    RsShortTermRentalHigh: number;
    RsShortTermRentalLow: number;
    RsStatus: string;
    RsSubType: string;
    RsTerraceSqm: number;
    RsTerraceSqmTo: number;
    RsType: string;
}

interface DurationProps {
    TT: number;
    OS: number;
    DB: number
}

export interface DataProps {
    count: number;
    duration: DurationProps;
    offset: number;
    resales: Property[];
    size: number;
    success: boolean;
    total: number;
}

export interface SearchTypeProps {
    label?: string;
    placeholder?: string;
    setDisableField?: (value: boolean) => void;
    disableField?: boolean;
    onHandleValueChange: (value: object | string | number, inputName: string) => void;
}

export interface IinitialSelectValue {
    searchIn: string;
    searchType: string;
    searchPropertyTypes: string[];
    searchLocations: string[];
    searchPriceFrom: number;
    searchPriceTo: number;
    searchRefId: string;
    sortName: string;
    sortOrder: string;
}
