
import api from "@/api/axios";
import { Command, CommandRecieved, Status } from "@/api/types";

import { API_ENDPOINTS } from "@/lib/constants";

export const commandService = {
  
  addNewCommand: async ( command  :Command) => api.post<CommandRecieved>(API_ENDPOINTS.COMMAND.NEW_BY_USER_ID(command.userId),command.OrderedDishes),

  setCommandStatus : async (commandId: string , status :Status ) => api.patch<CommandRecieved>(API_ENDPOINTS.COMMAND.STATUS_BY_ID(commandId ,status) ) ,

  getActiveCommandsByUserId : async(userId :string ) => api.get<CommandRecieved[]>(API_ENDPOINTS.COMMAND.ACTIVE_BY_ID(userId)),
};
