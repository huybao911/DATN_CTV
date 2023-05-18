export interface IJobEvent {
    _id: any;
    nameJob: string;
    event: any;
    quantity: number;
    quantityRemaining: number;
    unitPrice: number;
    total: number;
    jobDescription: string;
    jobRequest: string;
    update: string;
    delete: string;
  }