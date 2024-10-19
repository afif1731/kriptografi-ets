export interface IFooterModel {
    address_line_1: string;
    address_line_2: string;
    social_media: {
        facebook: string;
        youtube: string;
        instagram: string;
        wa: string;
        tiktok: string;
    }
    contact: {
        email: string;
        phone: {
            name: string;
            telp: string;
        }[]
    }
}