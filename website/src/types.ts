export type _CHARTDATA = {
    id: number;
    date: string;
    price: number;
    instrument_name: string;
}


export type _AUTH_CONTEXT = {
    username: string | undefined;
    // last_sign_in: string | undefined;
}

export type _USER_PROFILE = {
    user_id: string;
    user_type: string;
    email: string;
    user_name: string;
    broker: string;
}


export type _Holding = {
    tradingsymbol: string;
    exchange: string;
    isin: string;
    quantity: number;
    authorised_date: string;
    average_price: number;
    last_price: number;
    close_price: number;
    pnl: number;
    day_change: number;
    day_change_percentage: number;
}

export type NiftyPrice = {
    price: number;
  }
  