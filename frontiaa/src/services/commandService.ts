
import api from "@/api/axios";
import { Command, CommandRecieved } from "@/api/types";

import { API_ENDPOINTS } from "@/lib/constants";

export const commandService = {
  
  addNewCommand: async ( command  :Command) => api.post<CommandRecieved>(API_ENDPOINTS.COMMAND.NEW_BY_USER_ID(command.userId),command.OrderedDishes),
};
