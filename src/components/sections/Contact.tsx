"use client";

import { motion } from "framer-motion";
import { MaskLine } from "@/components/ui/AnimatedText";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ActionLink } from "@/components/ui/Actions";
import { Halo } from "@/components/ui/Halo";
import { ContactForm } from "./ContactForm";
import { profile, socials } from "@/data/profile";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section relative">
      <Halo className="left-1/2 top-[-10%] h-[54vw] w-[54vw] max-w-[720px] -translate-x-1/2" />

      <div className="shell relative">
        <div className="flex items-center gap-4">
          <span className="mono text-accent">07</span>
          <span className="eyebrow">Contact</span>
        </div>

        <h2 id="contact-heading" className="t-section mt-8">
          <MaskLine index={0}>Sitting on data nobody</MaskLine>
          <MaskLine index={1}>has time to read?</MaskLine>
          <MaskLine index={2}>
            <span className="display-italic text-accent">Let&rsquo;s fix that.</span>
          </MaskLine>
        </h2>

        <div className="mt-14 grid gap-14 border-t border-line pt-12 lg:grid-cols-12 lg:gap-6">
          {/* Direct routes */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-10 lg:col-span-5"
          >
            <div className="flex flex-col gap-4">
              <span className="eyebrow">Write to me</span>
              <CopyEmail />
            </div>

            <dl className="flex flex-col gap-5 border-t border-line-faint pt-6">
              <div className="flex flex-col gap-1.5">
                <dt className="mono text-faint">Availability</dt>
                <dd className="flex items-center gap-2.5 text-[0.95rem] text-ink">
                  {profile.availability.open ? <span className="pulse-dot" /> : null}
                  {profile.availability.label}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="mono text-faint">Response time</dt>
                <dd className="text-[0.95rem] text-ink">
                  {profile.availability.responseTime}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="mono text-faint">Working from</dt>
                <dd className="text-[0.95rem] text-ink">
                  {profile.location} · {profile.timezone}
                </dd>
              </div>
            </dl>

            {profile.calendar ? (
              <ActionLink href={profile.calendar} variant="outline" arrow="ne">
                Book a 20-minute call
              </ActionLink>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-line-faint pt-6">
              <span className="mono text-faint">Elsewhere</span>
              <ul className="flex flex-col">
                {socials.map((social) => (
                  <li key={social.key} className="border-b border-line-faint last:border-b-0">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="group flex items-center justify-between py-3"
                    >
                      <span className="text-[0.95rem] text-dim transition-colors duration-300 group-hover:text-ink">
                        {social.label}
                      </span>
                      <span className="mono text-faint transition-all duration-500 group-hover:translate-x-[-2px] group-hover:text-accent">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-6 lg:col-start-7"
          >
            <h3 className="sr-only">Project enquiry form</h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
