import PocketBase from "pocketbase";

class Database {
  private pb: PocketBase | undefined;

  public async getPocketbaseClient() {
    if (!!this.pb) return this.pb;
    this.pb = new PocketBase(process.env.POCKETBASE_URL);
    await this.pb
      .collection("_superusers")
      .authWithPassword(
        process.env.POCKERBASE_ADMIN_USERNAME as string,
        process.env.POCKERBASE_ADMIN_PASSWORD as string
      );
    return this.pb;
  }
}

export const database = new Database();
