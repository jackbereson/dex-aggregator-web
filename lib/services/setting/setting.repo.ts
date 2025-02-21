import { settingFields } from "./setting.field";
import { Setting } from "./setting.model";

import { CrudRepository } from "../../servers/main/crud.repo";
import { settingGroupFields } from "../settingGroup/settingGroup.field";

export class SettingRepository extends CrudRepository<Setting> {
  apiName: string = "Setting";
  shortFragment: string = this.parseFragment(`
    ${settingFields}
  `);
  fullFragment: string = this.parseFragment(`
    ${settingFields}
    group {
      ${settingGroupFields}
    }: SettingGroup
  `);
}

export const SettingService = new SettingRepository();
