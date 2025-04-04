export interface Iaction {
    type: string;
    payload: any;
  }

  export const setQ = (q: string) => ({
    type: "SET_Q",
    payload: q,
  });

  export const setPage = (page: number) => ({
    type: "SET_PAGE",
    payload: page,
  });
  
  

  export const setFilter = (filter: any) => ({
    type: "SET_FILTER",
    payload: filter,
  });   
  
  export const setData = (data: any) => ({
    type: "SET_DATA",
    payload: data,
  });
  
  
  
  
