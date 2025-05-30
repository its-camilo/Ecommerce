import { Layout } from "../../layouts";
import { UserInfo, Menu } from "../../components/Account";

export function AccountScreen() {
  return (
    <Layout.Basic showBack={false} textTitleCenter="Cuenta">
      <UserInfo />
      <Menu />
    </Layout.Basic>
  );
}
