import { Platform } from "react-native"
export const URLS = {
    BASE_URI: Platform.OS == 'android' ? 'https://oneehr.net/wheels24r.com/api' : 'http://oneehr.net/wheels24r.com/api',
    LOGIN: '/SalesPerson/saleperson_login',
    COMMON: '/SalesPerson/saleperson_dealer_common_details',
    LOGOUT: '/SalesPerson/salesperson_logout',
    REQUESTS: '/SalesPerson/saleperson_dashboard',
    REQUEST_DETAILS: '/SalesPerson/saleperson_dealer_request_view',
    ADD_DEALER: '/SalesPerson/saleperson_add_dealer',
    REJECT: '/SalesPerson/saleperson_dealer_reject_request',
    HOLD: '/SalesPerson/saleperson_dealer_hold_request',
    RE_INITIATE: '/SalesPerson/saleperson_dealer_reinitiate_request',
    FILTER_REQUESTS: '/SalesPerson/saleperson_dealer_requests',
    SUBSCRIBE_DETAILS: '/SalesPerson/saleperson_dealer_subscription_details',
}