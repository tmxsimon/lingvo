import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import type { LanguageUserPermissionType } from "../types";

type LanguageItemButtonProps = {
  userId: number;
  requestId: number;
  sharedLanguages: LanguageUserPermissionType[];
  requests: LanguageUserPermissionType[];
  approveRequest: (userId: number, requestId: number) => void;
  rejectRequest: (userId: number, requestId: number) => void;
};

const LanguageItemButton = ({
  userId,
  requestId,
  requests,
  approveRequest,
  rejectRequest,
}: LanguageItemButtonProps) => {
  const { t } = useTranslation();
  const requestsIds = requests.map((request) => request.id);
  const pendingRequestsIds = requests
    .filter((request) => request.is_approved === false)
    .map((request) => request.id);

  if (requestsIds.includes(requestId)) {
    return (
      <Button
        text={t("users.requests.unrequest")}
        theme="danger"
        confirm
        onClick={() => rejectRequest(userId, requestId)}
      />
    );
  } else if (pendingRequestsIds.includes(requestId)) {
    return (
      <Button
        text={t("users.requests.cancel")}
        theme="neutral"
        onClick={() => rejectRequest(userId, requestId)}
      />
    );
  } else {
    return (
      <Button
        text={t("users.requests.sendRequest")}
        onClick={() => approveRequest?.(userId, requestId)}
      />
    );
  }
};

export default LanguageItemButton;
