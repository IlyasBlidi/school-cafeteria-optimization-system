
import api from "@/api/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { CommandRecieved, CommandSent, Status } from "@/types/types";

export const commandService = {
  
  addNewCommand: async ( command  :CommandSent) => api.post<CommandRecieved>(API_ENDPOINTS.COMMAND.NEW_BY_USER_ID(command.userId),command.OrderedDishes),

  setCommandStatus : async (commandId: string , status :Status ) => api.patch<CommandRecieved>(API_ENDPOINTS.COMMAND.STATUS_BY_ID(commandId ,status) ) ,

  getActiveCommandsByUserId : async(userId :string ) => api.get<CommandRecieved[]>(API_ENDPOINTS.COMMAND.ACTIVE_BY_ID(userId)),
};
