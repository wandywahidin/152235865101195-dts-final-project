import React from "react";
import { BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-yellow-400 text-gray-700 font-bold text-center py-2 w-full static bottom-0">
      <p className="text-sm">&copy; 2022 DTS Kominfo Final Project</p>
      <p className="text-sm">Wandy Wahidin</p>
      <ul className="flex justify-center gap-3 mt-1">
        <li>
          <a
            href="https://www.instagram.com/wandywahidin/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <BsInstagram />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/wandywahidin"
            rel="noopener noreferrer"
            target="_blank"
          >
            <BsGithub />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/wandy-wahidin-8253ba17b/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <BsLinkedin />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
