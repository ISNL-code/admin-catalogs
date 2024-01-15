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
    storeData: StoreInterface;
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
    storeData: StoreInterface;
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
    webUrl: string;
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
    mainImage: string;
    descriptions: any;
    productImagesOptions: any;
    mainStoreSettings: any;
    additionalStoreSettings: any;
    dataBaseStoreSettings: any;
    securityStoreSettings: any;
    storeProductTypes: any;
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
    mainImage: string;
    descriptions: any;
    productImagesOptions: any;
    mainStoreSettings: any;
    additionalStoreSettings: any;
    dataBaseStoreSettings: any;
    securityStoreSettings: any;
    storeProductTypes: any;
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
    mainImage: string;
    descriptions: any;
    productImagesOptions: any;
    mainStoreSettings: any;
    additionalStoreSettings: any;
    dataBaseStoreSettings: any;
    securityStoreSettings: any;
    storeProductTypes: any;
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

export interface ManageProductInterface {
    id?: string | number;
    sku: string;
    visible: boolean;
    dateAvailable?: string;
    manufacturer: string;
    type: null | {
        id: null;
        code: string;
        visible: boolean;
        allowAddToCart: boolean;
        description: null;
        descriptions: {
            id: null;
            language: string;
            name: string;
            description: null;
            friendlyUrl: null;
            keyWords: null;
            highlights: null;
            metaDescription: null;
            title: null;
        }[];
    };
    display: boolean;
    canBePurchased: boolean;
    timeBound: boolean;
    price: string;
    quantity: number;
    sortOrder: string;
    productSpecifications: {
        height: null | string;
        weight: null | string;
        length: null | string;
        width: null | string;
        model?: null | string;
        manufacturer?: null | string;
        dimensionUnitOfMeasure?: string;
        weightUnitOfMeasure?: string;
    };
    descriptions:
        | {
              id: null;
              language: string;
              name: string;
              description: string;
              friendlyUrl: string;
              keyWords: string;
              highlights: string;
              metaDescription: string;
              title: string;
          }[]
        | [];
}
export interface ProductInterface {
    id: number | null;
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

export interface BrandsInterface {
    id: number | null;
    code: string | null;
    order: string;
    description: {
        id: number | null;
        language: string;
        name: string;
        description: string | null;
        friendlyUrl: string | null;
        keyWords: string | null;
        highlights: string | null;
        metaDescription: string | null;
        title: string | null;
    };
}

export interface EditBrandInterface {
    id?: number | null;
    code: string | null;
    order: string;
    descriptions?: {
        id: number | null;
        language: string;
        name: string;
        description: string | null;
        friendlyUrl: string | null;
        keyWords: string | null;
        highlights: string | null;
        metaDescription: string | null;
        title: string | null;
    }[];
}

export interface VariationsInterface {
    id: number;
    code: string;
    date: null | string;
    sortOrder: number;
    defaultValue: boolean;
    option: {
        id: number;
        code: string;
        type: string;
        readOnly: boolean;
        name: null;
        lang: string;
        variant: boolean;
        optionValues: any[];
    };
    optionValue: {
        id: number | number;
        code: string;
        name: string;
        defaultValue: boolean;
        sortOrder: number;
        image: null;
        price: null;
        description: null;
    };
}

export interface OptionsValueInterface {
    id: number;
    code: string;
    name: null;
    defaultValue: boolean;
    sortOrder: number;
    image: null;
    order: number;
    price: null;
    description: null;
    descriptions: {
        id: number;
        language: string;
        name: string;
        description: string;
        friendlyUrl: null;
        keyWords: null;
        highlights: null;
        metaDescription: null;
        title: null;
    }[];
}

export interface ProductAttrOptionsInterface {
    id: number;
    name: null;
    variant: boolean;
    sortOrder: number;
    attributeDefault: boolean;
    attributeDisplayOnly: boolean;
    productAttributeWeight: string;
    productAttributePrice: string;
    productAttributeUnformattedPrice: string;
    option: {
        id: number;
        code: string;
        type: string;
        readOnly: boolean;
        order: number;
        description: null;
        descriptions: [
            {
                id: number;
                language: string;
                name: string;
                description: null;
                friendlyUrl: null;
                keyWords: null;
                highlights: null;
                metaDescription: null;
                title: null;
            }
        ];
    };
    optionValue: {
        id: number;
        code: string;
        name: null;
        defaultValue: boolean;
        sortOrder: number;
        image: null;
        order: number;
        price: null;
        description?: null | {
            id: number;
            language: string;
            name: string;
            description: string;
            friendlyUrl: null | string;
            keyWords: null | string;
            highlights: null | string;
            metaDescription: null | string;
            title: null | string;
        };
        descriptions?: {
            id: number;
            language: string;
            name: string;
            description: string;
            friendlyUrl: null | string;
            keyWords: null | string;
            highlights: null | string;
            metaDescription: null | string;
            title: null | string;
        }[];
    };
}

export interface OptionsVariationInterface {
    id: number | null;
    variationId: number;
    colorId: number;
    code: string;
    name: null;
    defaultValue: boolean;
    sortOrder: number;
    image: null;
    price: null;
    description: null;
}

export interface ModelInterface {
    available: boolean;
    sku: string;
    code: string;
    defaultSelection: boolean;
    dateAvailable: string;
    sortOrder: string;
    variation: null;
    productVariantGroup: string;
    inventory: {
        price: {
            price: string;
        };
        quantity: number;
    };
    variationCode: string;
}

export interface CustomerInterface {
    id: number;
    emailAddress: string;
    billing: {
        postalCode: null | string;
        countryCode: null | string;
        firstName: string;
        lastName: string;
        bilstateOther: null | string;
        company: null | string;
        phone: string;
        address: null | string;
        city: null | string;
        stateProvince: null | string;
        billingAddress: false;
        latitude: null | string;
        longitude: null | string;
        zone: null | string;
        country: string;
    };
    delivery: null;
    gender: string;
    language: string;
    firstName: string;
    lastName: string;
    provider: null;
    storeCode: null;
    userName: string;
    rating: number;
    ratingCount: number;
    attributes: [];
    groups: {
        name: string;
        type: string;
        id: number;
    }[];
    favoriteStores: [];
}

export interface OrderInterface {
    id: number;
    totals: any[];
    attributes: any[];
    paymentType: string;
    paymentModule: string;
    shippingModule: null;
    previousOrderStatus: null;
    orderStatus: string;
    creditCard: null;
    datePurchased: string;
    currency: string;
    customerAgreed: boolean;
    confirmedAddress: boolean;
    comments: null;
    customer: null;
    products: ProductInterface[];
    billing: {
        postalCode: null;
        countryCode: null;
        firstName: string;
        lastName: string;
        bilstateOther: null;
        company: string;
        phone: string;
        address: null;
        city: null;
        stateProvince: null;
        billingAddress: boolean;
        latitude: null;
        longitude: null;
        zone: null;
        country: string;
        email: string;
        countryName: null;
        provinceName: null;
    };
    delivery: {
        postalCode: string;
        countryCode: null;
        firstName: string;
        lastName: string;
        bilstateOther: null;
        company: null;
        phone: string;
        address: string;
        city: string;
        stateProvince: null;
        billingAddress: boolean;
        latitude: null;
        longitude: null;
        zone: null;
        country: string;
        countryName: null;
        provinceName: null;
    };
    store: {
        id: number;
        code: string;
        name: string;
        defaultLanguage: string;
        currency: string;
        inBusinessSince: string;
        email: string;
        phone: string;
        template: null;
        useCache: boolean;
        currencyFormatNational: boolean;
        retailer: boolean;
        dimension: string;
        weight: string;
        currentUserLanguage: null;
        address: {
            stateProvince: string;
            country: string;
            address: string;
            postalCode: string;
            city: string;
            active: boolean;
        };
        logo: {
            name: string;
            path: string;
        };
        parent: null;
        supportedLanguages: any[];
        readableAudit: {
            created: null;
            modified: string;
            user: string;
        };
    };
    total: {
        id: number;
        title: null;
        text: null;
        code: string;
        order: number;
        module: string;
        value: number;
    };
    tax: null;
    shipping: null;
}
