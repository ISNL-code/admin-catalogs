export interface ProductManageInterface {
    sku: string;
    visible: boolean;
    dateAvailable: string;
    manufacturer: string;
    type: string;
    display: boolean;
    canBePurchased: boolean;
    timeBound: boolean;
    price: string;
    quantity: number;
    sortOrder: number;
    productSpecifications: {
        weight: null;
        height: null;
        width: null;
        length: null;
    };
    descriptions: [
        {
            language: string;
            name: string;
            highlights: string;
            friendlyUrl: string;
            description: string;
            title: string;
            keyWords: string;
            metaDescription: string;
        }
    ];
}

export interface MainContextInterface {
    lang: string;
    string: any;
    sortedStores: string;
    scrollPosition: number;
    setScrollPosition;
    instrumentalBarHeight: number;
    headerHeight: number;
    footerHeight: number;
    appXPadding: number;
    setSortedStores;
    auth: boolean;
    setFilteredStores;
    filteredStores: {}[];
    setOpenModalType;
    openModalType: string | null;
    setStoreToApprove;
    favoritesStores: StoreInterface[] | null;
    setFavoriteStores;
    storesList: StoreInterface[];
    updateFavoritesRes;
    storesData;
    loadStores: boolean;
    loadFavoritesStores: boolean;
}

export interface RetailerContextInterface {
    lang: string;
    string: any;
    scrollPosition: number;
    setScrollPosition;
    instrumentalBarHeight: number;
    headerHeight: number;
    footerHeight: number;
    appXPadding: number;
    auth: boolean;
    setOpenModalType;
    openModalType: string | null;
    userProfile: UserProfileInterface;
}

export interface CreateDataStore {
    name: string;
    code: string;
    phone: string;
    email: string;
    address: {
        searchControl: string;
        stateProvince: string;
        country: string;
        address: string;
        postalCode: string;
        city: string;
    };
    supportedLanguages: string[];
    defaultLanguage: string;
    currency: string;
    currencyFormatNational: boolean;
    weight: string;
    dimension: string;
    inBusinessSince: Date;
    useCache: Boolean;
    retailer: Boolean;
}

export interface EditDataStore {
    name: string;
    code: string;
    phone: string;
    email: string;
    address: {
        searchControl: string;
        stateProvince: string;
        country: string;
        address: string;
        postalCode: string;
        city: string;
    };
    supportedLanguages: string[];
    defaultLanguage: string;
    currency: string;
    currencyFormatNational: boolean;
    weight: string;
    dimension: string;
    inBusinessSince: Date;
    useCache: Boolean;
    retailer: Boolean;
    logo: null | { path: string };
    //to add
    image: null | string;
}

export interface RetailerStoreInterface {
    id?: number | null;
    firstName: string;
    lastName: string;
    store: string;
    userName: string;
    emailAddress: string;
    password: string;
    repeatPassword: string;
    active: boolean;
    defaultLanguage: string;
    groups: any;
    //to add
    phone: string | null;
    manager: boolean;
    telegram: string | null;
    viber: string | null;
    whatsApp: string | null;
}

export interface UserProfileInterface {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    defaultLanguage: string;
    userName: string;
    active: boolean;
    lastAccess: null;
    loginTime: null;
    merchant: string;
    permissions: {
        id: number;
        name: string;
    }[];
    groups: { id: number; name: string; type: null }[];
}

export interface UserListInterface {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    defaultLanguage: string;
    userName: string;
    active: boolean;
    lastAccess: null;
    loginTime: null;
    merchant: string;
    permissions: [
        {
            id: number;
            name: string;
        }
    ];
}

export interface StoreInterface {
    id: number;
    code: string;
    name: string;
    defaultLanguage: string;
    currency: string;
    inBusinessSince: string;
    email: string;
    phone: string;
    template: string | number | null;
    useCache: boolean;
    currencyFormatNational: boolean;
    retailer: boolean;
    dimension: string;
    weight: string;
    currentUserLanguage: string | number | null;
    address: {
        stateProvince: string;
        country: string;
        address: string;
        postalCode: string;
        city: string;
        active: boolean;
    };
    logo: { name: string; path: string } | null;
    parent: string | number | null;
    supportedLanguages: LangInterface[];
    readableAudit: {
        created: string | number | null;
        modified: string;
        user: string;
    };
    //add
    imgUrl: string; //require
    description: string; //require
    imgHeight: number; //require
    imgWidth: number; //require
    cropX: number | null;
    cropY: number | null;
    withCart: boolean;
    withFilters: boolean;
    withFavorites: boolean;
    withSKUSearch: boolean;
    withSizes: boolean;
    withContacts: boolean;
    withPrices: boolean;
    addedFavorite: boolean;
    withShare: boolean;
    sizesTable: string | null;
    private: boolean;
    approvedUsers: {}[];
    key_password: string | null;
    productTypes: { id: number; code: string }[];
    contacts: {
        managers: [
            {
                id: number;
                first_name: string | null;
                last_name: string | null;
                email: string | null;
                phone_number: string | null;
                telegram: string | null;
            }
        ];
    } | null;
}

export interface ItemDescriptionInterface {
    id: number;
    language: string;
    name: string;
    description: string;
    friendlyUrl: string;
    keyWords: string;
    highlights: string;
    metaDescription: string;
    title: string;
}

export interface PriceDescriptionInterface {
    id: number;
    originalPrice: string;
    finalPrice: string;
    defaultPrice: boolean;
    discounted: boolean;
    description: {
        id: number;
        language: string;
        name: string | number | null;
        description: string | number | null;
        friendlyUrl: string | number | null;
        keyWords: string | number | null;
        highlights: string | number | null;
        metaDescription: string | number | null;
        title: string | number | null;
        priceAppender: string | number | null;
    };
}

export interface ProductImageInterface {
    id: number;
    imageName: string;
    imageUrl: string;
    externalUrl: string | number | null;
    videoUrl: string | number | null;
    imageType: number;
    order: number;
    defaultImage: boolean;
}

export interface OptionValueInterface {
    id: number;
    code: string;
    name: string | number | null;
    defaultValue: boolean;
    sortOrder: number;
    image: string | number | null;
    order: number;
    price: string | number | null;
    description: ItemDescriptionInterface;
}

export interface ProductOptionsInterface {
    id: number;
    code: string;
    type: string;
    readOnly: boolean;
    name: string;
    lang: string;
    variant: boolean;
    option;
    Values: OptionValueInterface[];
}

export interface VariationInterface {
    id: number;
    code: string;
    date: string | number | null;
    sortOrder: number;
    defaultValue: boolean;
    option: {
        id: 100;
        code: string;
        type: string;
        readOnly: boolean;
        name: string | number | null;
        lang: string;
        variant: boolean;
        optionValues: OptionValueInterface[];
    };
    optionValue: OptionValueInterface;
}

export interface LangInterface {
    code: string;
    id: number;
}

export interface AddressInterface {
    stateProvince: string;
    country: string;
    address: string;
    postalCode: string;
    city: string;
    active: boolean;
}

export interface InventoryInterface {
    id: number;
    quantity: number;
    region: string;
    regionVariant: string | number | null;
    owner: string | number | null;
    dateAvailable: string | number | null;
    available: boolean;
    productQuantityOrderMin: number;
    productQuantityOrderMax: number;
    creationDate: string | number | null;
    store: StoreInterface;
    sku: string;
    prices: PriceDescriptionInterface[];
    price: string;
}

export interface ProductVariantInterface {
    id: number;
    productShipeable: boolean;
    available: boolean;
    visible: boolean;
    sortOrder: number;
    dateAvailable: string;
    creationDate: string | number | null;
    store: string;
    productId: number;
    sku: string;
    defaultSelection: boolean;
    variation: VariationInterface;
    variationValue: string | number | null;
    code: string;
    images: ProductImageInterface[];
    inventory: InventoryInterface[];
}

export interface ChildCategoryInterface {
    id: number;
    code: string;
    description: ItemDescriptionInterface;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: ParentCategoryInterface;
    productCount: number;
    store: string;
    children: ChildCategoryInterface[];
}

export interface ParentCategoryInterface {
    id: number;
    code: string;
    description: ItemDescriptionInterface;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: string | number | null;
    productCount: 0;
    store: string;
    children: ChildCategoryInterface[];
}

export interface CategoryInterface {
    id: number;
    code: string;
    description: ItemDescriptionInterface;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: {
        id: number;
        code: string;
        description: ItemDescriptionInterface;
        sortOrder: number;
        visible: boolean;
        featured: boolean;
        lineage: string;
        depth: number;
        parent: ParentCategoryInterface;
        productCount: number;
        store: string;
        children: ChildCategoryInterface[];
    };
    productCount: number;
    store: string;
    children: ChildCategoryInterface[];
}

export interface ProductListInterface {
    id: number;
    productShipeable: boolean;
    available: boolean;
    visible: boolean;
    sortOrder: number;
    dateAvailable: string;
    creationDate: string;
    price: number;
    quantity: number;
    sku: string;
    preOrder: boolean;
    productVirtual: boolean;
    quantityOrderMaximum: number;
    quantityOrderMinimum: number;
    productIsFree: boolean;
    productSpecifications: {};
    rating: number;
    ratingCount: number;
    refSku: boolean;
    rentalDuration: number;
    rentalPeriod: number;
    description: ItemDescriptionInterface;
    productPrice: PriceDescriptionInterface;
    finalPrice: string;
    originalPrice: string;
    discounted: boolean;
    image: ProductImageInterface;
    images: ProductImageInterface[];
    manufacturer: {
        id: number;
        code: string;
        order: number;
        description: string | number | null;
    };
    attributes: [];
    options: ProductOptionsInterface[];
    variants: ProductVariantInterface[];
    properties: [];
    categories: CategoryInterface[];
    type: string | number | null;
    canBePurchased: boolean;
    owner: string | number | null;
}
