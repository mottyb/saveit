import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useContext, useState } from "react";
import { Button } from "antd";
import { familyContext } from "../../Layout";

export default function Share() {
  const { family } = useContext(familyContext);

  const message = `אני משתתף באתגר החיסכון חסכנו כבר ${
    family.total_save
  } שקלים`;
  const socials = [
    {
      outlet: "LinkedIn",
      href: "https://www.linkedin.com/share?summary="+message,
      background: "#0a66c2",
      color: "white",
      label: message,
      icon: <FaLinkedin />,
    },
    {
      outlet: "Facebook",
      href: "https://www.facebook.com/sharer.php?u=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
      background: "#3b5898",
      color: "white",
      label: "Share on Facebook",
      icon: <FaFacebook />,
    },
    {
      outlet: "Twitter",
      href: "https://twitter.com/intent/tweet?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&text=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&via=dannysasse",
      background: "#00aced",
      color: "white",
      label: "Share on Twitter",
      icon: <FaSquareXTwitter />,
    },
    //   {
    //     outlet: "Email",
    //     href:
    //       "mailto:?subject=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig%20Check%20out%20this%20new%20article%20on%20Jest%20testing%20in%20React!",
    //     background: "#dd4b39",
    //     color: "white",
    //     label: "Share via Email",
    //     icon: <MailOutlineIcon />
    //   },
    //   {
    //     outlet: "SMS",
    //     href:
    //       "sms:?body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
    //     background: "#7bcb20",
    //     color: "white",
    //     label: "Share via SMS",
    //     icon: <SmsIcon />
    //   }
  ];

  const socialLinks = socials.map((social, index) => {
    return (
      <Button
        as="a"
        href={social.href}
        target="_blank"
        rel="noreferrer"
        label={social.label}
        role="button"
        background={social.background}
        color={social.color}
        position={index}
        key={index}
      >
        {social.icon}
      </Button>
    );
  });

  return (
    <div>
        {socialLinks}
    </div>
  );
}
