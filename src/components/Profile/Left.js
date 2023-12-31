import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Card from "../../shared/ui/Card";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import TextMain from "../../shared/text/TextMain";
import TextSecondary from "../../shared/text/TextSecondary";
import { ButtonGhost } from "../../shared/ui/Button";
import EditModal from "../../components/Profile/EditModal";
import logOut from "../../server/profile/logOut";

import SettingsIcon from "../../shared/icons/SettingsIcon";
import LogOutIcon from "../../shared/icons/LogOutIcon";

const Left = ({ data, getUserInfo }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);

  const logOutHadle = async () => {
    navigate(0);
    await logOut();
  };

  useEffect(() => {
    if (modalState === false && getUserInfo) getUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  return (
    <>
      <Card styles="min-w-[260px] [@media(hover)]:max-w-[260px] w-full flex flex-col gap-[12px]">
        <EmptyAvatar />

        <div className="flex flex-col gap-[6px]">
          <TextMain
            text={data.name}
            styles="font-medium text-[18px] leading-[21.6px] tracking-[-0.025em]"
          />
          {data.about && (
            <TextSecondary
              text={`${data.about}`}
              styles="font-medium text-[16px] leading-[16px] tracking-[-0.015em]"
            />
          )}
          {data.location && (
            <TextSecondary
              text={`${data.location}`}
              styles="font-medium text-[14px] leading-[16px] tracking-[-0.015em]"
            />
          )}
          {data.birth && (
            <TextSecondary
              text={`${data.birth}`}
              styles="font-medium text-[14px] leading-[16px] tracking-[-0.015em]"
            />
          )}
        </div>
      </Card>

      {pathname === "/profile" && (
        <>
          <Card>
            <ButtonGhost
              text="Редактировать профиль"
              onClick={() => setModalState(true)}
            >
              <SettingsIcon />
            </ButtonGhost>
          </Card>

          <Card>
            <ButtonGhost text="Выход" onClick={() => logOutHadle()}>
              <LogOutIcon />
            </ButtonGhost>
          </Card>

          {/* modal */}
          <EditModal data={data} state={modalState} setstate={setModalState} />
          {/* modal */}
        </>
      )}
    </>
  );
};

export default Left;
