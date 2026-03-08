import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

const NotFound = () => {
  const location = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("not_found_title")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("not_found_desc")}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {t("not_found_link")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
