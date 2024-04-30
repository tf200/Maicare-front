export type AnalyticsResDto = {
  users: {
    total_users: number;
    total_in_care_users: number;
    total_out_of_care_users: number;
    total_on_waiting_list_users: number;
  };
  contracts: {
    total_contracts: number;
    total_accommodation_contracts: number;
    total_ambulante_contracts: number;
    total_approved_contracts: number;
    total_stopped_contracts: number;
    total_terminated_contracts: number;
  };
  medications: {
    total_attachments: number;
    total_medications: number;
    total_critical_medications: number;
    total_medication_records: number;
    total_taken_medication_records: number;
    total_not_taken_medication_records: number;
    total_waiting_medication_records: number;
  };
  invoices: {
    total_invoices: number;
    total_paid_invoices: number;
    total_partially_paid_invoices: number;
    total_outstanding_invoices: number;
    total_overpaid_invoices: number;
  };
  finance: {
    total_paid_amount: string;
    total_expenses: string;
  };
};
