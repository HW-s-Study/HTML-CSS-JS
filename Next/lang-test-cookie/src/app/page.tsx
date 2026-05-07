import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");
  return (
    <div>
      <h2>{t('title')}</h2>
    </div>
  );
}