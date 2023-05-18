export interface IEvent {
    _id: any;
    nameEvent: string;
    poster: any;
    approver: any;
    comments: any;
    quantityUser: number;
    job: string;
    location: string;
    departmentEvent: any;
    costs: string;
    dayStart:string;
    dayEnd:string;
    contentEvent: string;
    update: string;
    delete: string;
    image: string;
    ggSheet: string;
    created_at:string;
    
    usersApplyJob:any;

    nameJob: string;
    unitPrice: number;
    
    userApply: any;
    applyStatus: string;
    coefficient: number;
    total: number;
    approve: string;
    unapprove: string;
    acceptStatus: string;
    accept: string;
    unaccept: string;
  }