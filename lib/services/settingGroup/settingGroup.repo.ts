import { settingGroupFields } from "./settingGroup.field";
import { SettingGroup } from "./settingGroup.model";

import { CrudRepository } from "../../servers/main/crud.repo";
import { settingFields } from "../setting/setting.field";

export class SettingGroupRepository extends CrudRepository<SettingGroup> {
  apiName: string = "SettingGroup";
  shortFragment: string = this.parseFragment(`
    ${settingGroupFields}
  `);
  fullFragment: string = this.parseFragment(`
    ${settingGroupFields}
    settings {
      ${settingFields}
    }: [Setting]
  `);
}

export const SettingGroupService = new SettingGroupRepository();
