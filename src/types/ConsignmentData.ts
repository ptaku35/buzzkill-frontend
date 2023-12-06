export type ConsignmentData = {
  consignments_assigned: number;
  consignments_unassigned: number;
  total_consignments: number;
  user_shippers_count: number;
};

export type ConsignmentDetails = {
  batch_contract_address: string;
  batch_description: string;
  batch_id: string;
  batch_quantity: string;
  product_id: string;
  product_name: string;
  profile_id_oem: string;
  shipping_status: string;
  assigned_shipper: string;
  assigned_shipper_address: string;
};
