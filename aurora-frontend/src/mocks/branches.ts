export interface Branch {
  id: string;
  code: string;
  name: string;
  address: string;
}

export const BRANCHES: Record<string, Branch> = {
  hcm: {
    id: "hcm",
    code: "HCM",
    name: "Hồ Chí Minh",
    address: "12 Nguyễn Văn A, Hạnh Thông, Thành phố Hồ Chí Minh",
  },
  hno: {
    id: "hno",
    code: "HNO",
    name: "Hà Nội",
    address: "14 Nguyễn Văn C, Cầu Giấy, Hà Nội",
  },
  dng: {
    id: "dng",
    code: "DNG",
    name: "Đà Nẵng",
    address: "13 Nguyễn Văn B, An Nhơn, Thành phố Đà Nẵng",
  },
};

// Helper function to get branch by id
export const getBranchById = (id: string): Branch | undefined => {
  return BRANCHES[id];
};

// Helper function to get all branches as array
export const getAllBranches = (): Branch[] => {
  return Object.values(BRANCHES);
};

// Helper function to get default branch (HCM)
export const getDefaultBranch = (): Branch => {
  return BRANCHES.hcm;
};

