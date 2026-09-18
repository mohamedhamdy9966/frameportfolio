'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { FaLocationArrow, FaWhatsapp } from 'react-icons/fa';

import {
  DropDownContainer,
  DropDownIcon,
  DropDownItem,
  DropDownItemDesc,
  DropDownItemTitle,
  DropDownTextContainer,
} from './NavDropDown';

/**
 * Small contact dropdown.
 *
 * Previously this file was a placeholder that rendered the literal text
 * "NavDropDown" and imported styles it never used. It now renders a real,
 * accessible contact menu driven by the `active` + `contacts` props.
 *
 * NOTE: it is intentionally left unmounted because the Header now owns its
 * own services dropdown; import it wherever a contact menu is needed.
 */
const defaultContacts = [
  {
    Icon: AiFillPhone,
    href: 'tel:+201111255279',
    title: 'Call us',
    desc: '+20 111 125 5279 · Sun–Thu, 9:00–18:00',
  },
  {
    Icon: FaWhatsapp,
    href: 'https://wa.me/201111255279',
    title: 'WhatsApp',
    desc: 'Fastest reply — usually within the hour',
  },
  {
    Icon: AiOutlineMail,
    href: 'mailto:info@taxi.com',
    title: 'Email',
    desc: 'info@taxi.com — replies within 24 hours',
  },
  {
    Icon: FaLocationArrow,
    href: '#contact',
    title: 'Send a brief',
    desc: 'Tell us the scope and we will quote it',
  },
];

const NavDropDown = ({ active = false, contacts = defaultContacts }) => (
 <AnimatePresence>
    {active && (
      <DropDownContainer
        as={motion.div}
        active={active}
        initial={{ opacity: 0, y: -8, scaleY: 0.6 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        exit={{ opacity: 0, y: -8, scaleY: 0.6 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top center' }}
      >
        {contacts.map(({ Icon, href, title, desc }) => (
          <DropDownItem
            key={title}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <DropDownIcon aria-hidden="true">
              <Icon size="2rem" />
            </DropDownIcon>
            <DropDownTextContainer>
              <DropDownItemTitle>{title}</DropDownItemTitle>
              <DropDownItemDesc>{desc}</DropDownItemDesc>
            </DropDownTextContainer>
          </DropDownItem>
        ))}
      </DropDownContainer>
    )}
 </AnimatePresence>
);

export default NavDropDown;
