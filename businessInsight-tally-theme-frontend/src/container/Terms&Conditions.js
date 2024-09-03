// ** MUI Components
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import FooterNoAuth from 'src/@core/layouts/landingComponent/noAuthFooter'
import styles from './landingPage.module.css'

const TermsConditions = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <div className={styles.body}>
        {/* section 1 */}
        <div className={styles.containerBlockCenter}>
          <div className={styles.container}>
            <Box className={styles.section1Div} sx={{ height: '100% !important', background: 'white' }}>
              <Box
                sx={{
                  paddingTop: '100px',
                  paddingBottom: '100px',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}
                className={styles.container}
              >
                <Box
                  sx={{
                    height: '100%',

                    //   border: '2px solid Black',
                    width: '100%'
                  }}
                >
                  <Box sx={{}}>
                    <h1
                      style={{
                        margin: '0',
                        padding: '20px 0 0 0',
                        textAlign: 'center'
                      }}
                    >
                      Terms & Conditions
                    </h1>
                  </Box>

                  {/* Terms & Conditions Content starts below */}
                  <Box sx={{ width: '100%' }}>
                    <ul
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'column',
                        listStyleType: 'none',
                        padding: '0',
                        padding: isMobile ? '0 18px 0 18px' : '0'
                      }}
                    >
                      <li>
                        <Typography sx={{ textAlign: 'justify' }}>
                          THIS IS AN AGREEMENT BETWEEN YOU OR THE ENTITY THAT YOU REPRESENT ( HEREINAFTER “YOU” or
                          “YOUR”) AND INSIGHTIFI GOVERNING YOUR USE OF INSIGHTIFI SUITE OF ONLINE BUSINESS PRODUCTIVITY
                          AND COLLABORATION SOFTWARE IF YOU ARE BASED IN INDIA.
                        </Typography>
                      </li>
                      <li>
                        <h2>Parts of this Agreement</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          This Agreement consists of the following terms and conditions (hereinafter the “General
                          Terms”) and terms and conditions, if any, specific to use of individual Services (hereinafter
                          the “Service Specific Terms”). In the event of a conflict between the General Terms and
                          Service Specific Terms, the Service Specific Terms shall prevail.
                        </Typography>
                      </li>
                      <li>
                        <h2>Acceptance of the Agreement</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          You must be of legal age to enter into a binding agreement in order to accept the Agreement.
                          If you do not agree to the General Terms, do not use any of our Services. If you agree to the
                          General Terms and do not agree to any Service Specific Terms, do not use the corresponding
                          Service. You can accept the Agreement by checking a checkbox or clicking on a button
                          indicating your acceptance of the Agreement or by actually using the Services.
                        </Typography>
                      </li>
                      <li>
                        <h2>Description of Service</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          We provide applications for businesses, including associated offline and mobile applications
                          ("Service" or "Services"). You may use the Services for your personal and business use or for
                          internal business purposes in the organization that you represent. You may connect to the
                          Services using any Internet browser supported by the Services. You are responsible for
                          obtaining access to the Internet and the equipment necessary to use the Services. You can
                          create and edit content with your user account and if you choose to do so, you can publish and
                          share such content.
                        </Typography>
                      </li>
                      <li>
                        <h2>Beta Service</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          We may offer certain Services as closed or open beta services ("Beta Service" or “Beta
                          Services”) for the purpose of testing and evaluation. You agree that we have the sole
                          authority and discretion to determine the period of time for testing and evaluation of Beta
                          Services. We will be the sole judge of the success of such testing and the decision, if any,
                          to offer the Beta Services as commercial services. You will be under no obligation to acquire
                          a subscription to use any paid Service as a result of your subscription to any Beta Service.
                          We reserve the right to fully or partially discontinue, at any time and from time to time,
                          temporarily or permanently, any of the Beta Services with or without notice to you. You agree
                          that Insightifi will not be liable to you or to any third party for any harm related to,
                          arising out of, or caused by the modification, suspension or discontinuance of any of the Beta
                          Services for any reason.
                        </Typography>
                      </li>
                      <li>
                        <h2>Free Trial</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          If you register for a free trial of one or more Services, Insightifi will make the applicable
                          Services available to you on a trial basis free of charge until the earlier of <br />{' '}
                          <b>(i)</b> the end of the free trial period of the applicable Services (unless terminated
                          earlier by you), <br /> <b>(ii)</b> the start date of the paid subscription period for the
                          applicable Services, or <br />
                          <b>(iii)</b> termination by Insightifi in its sole discretion. Any data that you enter into
                          the Services, and any customizations made to the Services during the free trial will be
                          permanently lost unless you
                          <br /> <br />
                          <b>(i)</b> purchase the corresponding paid subscription plan for the account, <br />{' '}
                          <b>(ii)</b> purchase applicable Service upgrades, or <br />
                          <b>(iii)</b> export such data before the end of the trial period. Notwithstanding anything
                          contained in this Section, Services are offered as-is during the free trial, without any
                          warranty, covenant, support or liability whatsoever, to the extent permitted by law.
                        </Typography>
                      </li>
                      <li>
                        <h2>User Sign up Obligations</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          You need to sign up for a user account by providing all required information in order to
                          access or use the Services. If you represent an organization and wish to use the Services for
                          corporate internal use, we recommend that you, and all other users from your organization,
                          sign up for user accounts by providing your corporate contact information. In particular, we
                          recommend that you use your corporate email address. You agree to: <br /> <b>(i)</b> Provide
                          true, accurate, current and complete information about yourself as prompted by the sign up
                          process; and <br /> <b>(ii)</b> Maintain and promptly update the information provided during
                          sign up to keep it true, accurate, current, and complete. If you provide any information that
                          is untrue, inaccurate, outdated, or incomplete, or if Insightifi has reasonable grounds to
                          suspect that such information is untrue, inaccurate, outdated, or incomplete, Insightifi may
                          terminate your user account and refuse current or future use of any or all of the Services.
                        </Typography>
                      </li>
                      <li>
                        <h2>Restrictions on Use</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          In addition to all other terms and conditions of this Agreement, you shall not:
                          <br /> <b>(i)</b> Transfer the Services or otherwise make it available to any third party;{' '}
                          <br />
                          <b>(ii)</b> Provide any service based on the Services without prior written permission;
                          <br /> <b>(iii)</b> Allow user licenses to be shared or used by more than one individual other
                          than by way of reassigning the user license to a new user;
                          <br /> <b>(iv)</b> Except as permitted under applicable law, attempt to disassemble, reverse
                          engineer or decompile the Services;
                          <br /> <b>(v)</b> Use the third party links to sites without agreeing to their website terms &
                          conditions;
                          <br /> <b>(vi)</b> Post links to third party sites or use their logo, company name, etc.
                          without their prior written permission;
                          <br /> <b>(vii)</b> Attempt to gain unauthorized access to the Services or its related systems
                          or network;
                          <br /> <b>(viii)</b> Use the Services in any manner that could damage, disable, overburden,
                          impair or harm any server, network, computer system, resource of Insightifi;
                          <br /> <b>(ix)</b> Use the Services to send or store material containing software viruses,
                          worms or other harmful computer codes, files, scripts or programs;
                          <br /> <b>(x)</b> Use the Services in any manner that interferes with or disrupts the
                          integrity, security or performance of the Services, its components and the data contained
                          therein;
                          <br /> <b>(xi)</b> Host, display, upload, modify, publish, transmit, store, update or share
                          any information that belongs to another person or entity and to which you do not have any
                          right, including personal or confidential information of any person or entity with respect to
                          which you do not have consent or permission from such person or entity;
                          <br /> <b>( xii)</b> Violate any applicable local, state, national or international law;
                          <br /> <b>(xiii)</b> use the Services for any form of competitive or benchmarking purposes;
                          and
                          <br /> <b>(xiv)</b> Remove or obscure any proprietary or other notices contained in the
                          Services;
                          <br /> <b>(xv)</b> Use our Services in any manner that threatens the unity, integrity,
                          defence, security or sovereignty of India, friendly relations of India with other countries,
                          or public order, or causes incitement to the commission of any cognisable offense or prevents
                          investigation of any offense or is insulting other countries;
                          <br /> <b>(xvi)</b> Create a false identity to mislead any person as to the identity or origin
                          of any communication;
                          <br /> <b>(xvii)</b> Use the services for transmitting information that is patently false and
                          untrue, and is written or published in any form, with the intent to mislead or harass a
                          person, entity or agency for financial gain or to cause any injury to any person;
                          <br /> <b>OR</b>
                          <br /> <b>(xviii)</b> Use the services in a manner that relates to or encourages any activity
                          prohibited by law in India.
                        </Typography>
                      </li>
                      <li>
                        <h2>Spamming and Illegal Activities</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          You agree to be solely responsible for the contents of your transmissions through the
                          Services. You agree not to use the Services for illegal purposes or for the transmission of
                          material that is unlawful, defamatory, insulting, harassing, libelous, invasive of another's
                          privacy (including bodily privacy), abusive, threatening, harmful, vulgar, pornographic,
                          paedophilic, harmful to children, obscene, racially or ethnically objectionable, or is
                          otherwise objectionable, offends religious sentiments, promotes racism, contains viruses or
                          malicious code, or that which infringes or may infringe intellectual property or other rights
                          of another. You agree not to use the Services for the transmission of "junk mail", "spam",
                          "chain letters", “phishing” or unsolicited mass distribution of email. We reserve the right to
                          terminate your access to the Services if there are reasonable grounds to believe that you have
                          used the Services for any illegal or unauthorized activity.
                        </Typography>
                      </li>
                      <li>
                        <h2>Third Party Applications</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          Insightifi Services integrate with many third party applications (hereinafter "Third Party
                          Application(s)"). Access and use of the Third Party Applications may require acceptance of
                          terms of service and privacy policies applicable to such Third Party Applications (hereinafter
                          "Third Party Terms''). You are responsible for reading and understanding the Third Party Terms
                          before accessing or using any Third Party Application. You acknowledge and agree that
                          Insightifi is not liable for any Third Party Applications. While we will try to provide you
                          with advance notice, whenever reasonably possible, you acknowledge and agree that Insightifi
                          may, at any time and in our sole discretion, and without any notice to you, suspend, restrict
                          or disable access to or remove from Insightifi Services, any Third Party Application, without
                          any liability to you, including without limitation for any loss of profits, revenue, data,
                          goodwill or other intangible losses.
                        </Typography>
                      </li>
                      <li>
                        <h2>Fees and Payments</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          The Services are available under subscription plans of various durations. Payments for
                          subscription plans of duration of less than a year can be made only by Credit Card. Your
                          subscription will be automatically renewed at the end of each subscription period unless you
                          downgrade your paid subscription plan to a free plan or inform us that you do not wish to
                          renew the subscription. At the time of automatic renewal, the subscription fee will be charged
                          to the Credit Card last used by you. We provide you the option of changing the details if you
                          would like the payment for the renewal to be made through a different Credit Card. If you do
                          not wish to renew the subscription, you must inform us at least seven days prior to the
                          renewal date. If you have not downgraded to a free plan and if you have not informed us that
                          you do not wish to renew the subscription, you will be presumed to have authorized Insightifi
                          to charge the subscription fee to the Credit Card last used by you. <br /> <br /> From time to
                          time, we may change the price of any Service or charge for use of Services that are currently
                          available free of charge. Any increase in charges will not apply until the expiry of your then
                          current billing cycle. You will not be charged for using any Service unless you have opted for
                          a paid subscription plan. <br />
                          <br />
                          In the event any tax such as GST, VAT, sales tax or the like is chargeable by Insightifi in
                          accordance with any local, state, provincial or foreign laws with respect to your subscription
                          to our Services ("Taxes''), Insightifi will invoice you for such Taxes. You agree to pay
                          Insightifi such Taxes in addition to the subscription fees. Insightifi shall provide you with
                          an invoice in the format prescribed by the applicable local, state, provincial or foreign laws
                          to help you avail the applicable input tax credit for the Taxes so paid.
                        </Typography>
                      </li>
                      {/* <li style={{ padding: isMobile ? '0 18px 0 18px' : '0' }}> */}
                      <li>
                        <h2>Organization Accounts and Administrators</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          When you sign up for an account for your organization you may specify one or more
                          administrators. The administrators will have the right to configure the Services based on your
                          requirements and manage end users in your organization account. If your organization account
                          is created and configured on your behalf by a third party, it is likely that such third party
                          has assumed administrator role for your organization. Make sure that you enter into a suitable
                          agreement with such a third party specifying such party’s roles and restrictions as an
                        </Typography>
                        administrator of your organization account.
                        <Box sx={{ display: isMobile && 'flex', flexDirection: 'column' }}>
                          <p>You are responsible for:</p>
                          <p>
                            <b>(i)</b> Ensuring confidentiality of your organization account password,
                          </p>
                          <p>
                            <b>(ii)</b> Appointing competent individuals as administrators for managing your
                            organization account, and
                          </p>
                          <p>
                            <b>(iii)</b> Ensuring that all activities that occur in connection with your organization
                            account comply with this Agreement. You understand that Insightifi is not responsible for
                            account administration and internal management of the Services for you.
                          </p>
                          <p>
                            You are responsible for taking necessary steps for ensuring that your organization does not
                            lose control of the administrator accounts. You may specify a process to be followed for
                            recovering control in the event of such loss of control of the administrator accounts by
                            sending an email to <a href='#'>info@insightifi.in</a>, provided that the process is
                            acceptable to Insightifi. In the absence of any specified administrator account recovery
                            process, Insightifi may provide control of an administrator account to an individual
                            providing proof satisfactory to Insightifi demonstrating authorization to act on behalf of
                            the organization. You agree not to hold Insightifi liable for the consequences of any action
                            taken by Insightifi in good faith in this regard.
                          </p>
                        </Box>
                      </li>
                      <li>
                        <h2>Personal Information and Privacy</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          You are responsible for maintaining confidentiality of your username, password and other
                          sensitive information. You are responsible for all activities that occur in your user account
                          and you agree to inform us immediately of any unauthorized use of your user account by email
                          to
                          <a href='#'> info@insightifi.in</a> or by calling us on any of the numbers. We are not
                          responsible for any loss or damage to you or to any third party incurred as a result of any
                          unauthorized access and/or use of your user account, or otherwise.
                        </Typography>
                      </li>
                      <li>
                        <h2>Communications from Insightifi</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          The Service may include certain communications from Insightifi, such as service announcements,
                          administrative messages and newsletters. You understand that these communications shall be
                          considered part of using the Services. As part of our policy to provide you total privacy, we
                          also provide you the option of opting out from receiving newsletters from us. However, you
                          will not be able to opt-out from receiving service announcements and administrative messages.
                        </Typography>
                      </li>
                      <li>
                        <h2>Complaints</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          If we receive a complaint from any person with respect to your activities as part of use of
                          the Services , we will forward the complaint to the primary email address of your user
                          account. You must respond to the complainant directly within 10 days of receiving the
                          complaint forwarded by us and copy Insightifi in the communication. If you do not respond to
                          the complainant within 10 days from the date of our email to you, we may disclose your name
                          and contact information to the complainant for enabling the complainant to take legal action
                          against you. You understand that your failure to respond to the forwarded complaint within the
                          10 days’ time limit will be construed as your consent to disclosure of your name and contact
                          information by Insightifi to the complainant.
                        </Typography>
                      </li>
                      <li>
                        <h2>Inactive User Accounts Policy</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          We reserve the right to terminate unpaid user accounts that are inactive for a continuous
                          period of 120 days. In the event of such termination, all data associated with such a user
                          account will be deleted. We will provide you prior notice of such termination and option to
                          back-up your data. The data deletion policy may be implemented with respect to any or all of
                          the Services. Each Service will be considered an independent and separate service for the
                          purpose of calculating the period of inactivity. In other words, activity in one of the
                          Services is not sufficient to keep your user account in another Service active. In case of
                          accounts with more than one user, if at least one of the users is active, the account will not
                          be considered inactive.
                        </Typography>
                      </li>
                      <li>
                        <h2>Hosting Location</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          The location of the cloud facility from which you are served depends on the mapping of your
                          region/country to the available cloud facilities at the time of your sign-up. We may migrate
                          your account or require you to migrate your account to a different cloud facility in the event
                          of any updates to the region/country to cloud facility mapping at any point of time. You must
                          not mask your internet protocol (IP) address at the time of sign-up since your region/country
                          is determined based on your IP address. If, at any time, your actual region/country is found
                          to be different from the region/country in our records, Insightifi may take appropriate action
                          such as migrate your account or require you to migrate your account to the cloud facility
                          corresponding to your region/country, or close your account and deny the Service to you. If
                          you are served from a cloud facility outside your region/country and a Insightifi group entity
                          has an office in your region/country, apart from storing the data in the cloud facility
                          assigned to you, we may store a local copy of the data in your region/country.
                        </Typography>
                      </li>
                      <li>
                        <h2>Data Ownership</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          We respect your right to ownership of content created or stored by you. You own the content
                          created or stored by you. Unless specifically permitted by you, your use of the Services does
                          not grant Insightifi the license to use, reproduce, adapt, modify, publish or distribute the
                          content created by you or stored in your user account for Insightifi’s commercial, marketing
                          or any similar purpose. But you grant Insightifi permission to access, copy, distribute,
                          store, transmit, reformat, publicly display and publicly perform the content of your user
                          account solely as required for the purpose of providing the Services to you.
                        </Typography>
                      </li>
                      <li>
                        <h2>User Generated Content</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          User Generated Content You may transmit or publish content created by you using any of the
                          Services or otherwise. However, you shall be solely responsible for such content and the
                          consequences of its transmission or publication. If you are a publisher of news and current
                          affairs content as defined under Information Technology (Intermediary Guidelines and Digital
                          Media Ethics Code) Rules 2021, you shall furnish details to the Ministry of Information and
                          Broadcasting as required by rule 18. Any content made public will be publicly accessible
                          through the internet and may be crawled and indexed by search engines. You are responsible for
                          ensuring that you do not accidentally make any private content publicly available. Any content
                          that you may receive from other users of the Services, is provided to you AS IS for your
                          information and personal use only and you agree not to use, copy, reproduce, distribute,
                          transmit, broadcast, display, sell, license or otherwise exploit such content for any purpose,
                          without the express written consent of the person who owns the rights to such content. In the
                          course of using any of the Services, if you come across any content with copyright notice(s)
                          or any copy protection feature(s), you agree not to remove such copyright notice(s) or disable
                          such copy protection feature(s) as the case may be. By making any copyrighted/copyrightable
                          content available on any of the Services you affirm that you have the consent, authorization
                          or permission, as the case may be from every person who may claim any rights in such content
                          to make such content available in such manner. Further, by making any content available in the
                          manner aforementioned, you expressly agree that Insightifi will have the right to block access
                          to or remove such content made available by you if Insightifi receives complaints concerning
                          any illegality or infringement of third party rights in such content. By using any of the
                          Services and transmitting or publishing any content using such Service, you expressly consent
                          to determination of questions of illegality or infringement of third party rights in such
                          content by the agent designated by Insightifi for this purpose.
                        </Typography>
                      </li>
                      <li>
                        <h2>Sample files and Applications</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          Insightifi may provide sample files and applications for the purpose of demonstrating the
                          possibility of using the Services effectively for specific purposes. The information contained
                          in any such sample files and applications consists of random data. Insightifi makes no
                          warranty, either express or implied, as to the accuracy, usefulness, completeness or
                          reliability of the information or the sample files and applications.
                        </Typography>
                      </li>
                      <li>
                        <h2>Trademark</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          Insightifi, Insightifi logo, the names of individual Services and their logos are trademarks
                          of Insightifi Corporation Private Limited. You agree not to display or use, in any manner, the
                          Insightifi trademarks, without Insightifi’s prior permission.
                        </Typography>
                      </li>
                      <li>
                        <h2>Disclaimer of Warranties</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          YOU EXPRESSLY UNDERSTAND AND AGREE THAT THE USE OF THE SERVICES IS AT YOUR SOLE RISK. THE
                          SERVICES ARE PROVIDED ON AN AS-IS-AND-AS-AVAILABLE BASIS. INSIGHTIFI EXPRESSLY DISCLAIMS ALL
                          WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
                          WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. INSIGHTIFI MAKES NO
                          WARRANTY THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR FREE. USE OF ANY
                          MATERIAL DOWNLOADED OR OBTAINED THROUGH THE USE OF THE SERVICES SHALL BE AT YOUR OWN
                          DISCRETION AND RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM,
                          MOBILE TELEPHONE, WIRELESS DEVICE OR DATA THAT RESULTS FROM THE USE OF THE SERVICES OR THE
                          DOWNLOAD OF ANY SUCH MATERIAL. NO ADVICE OR INFORMATION, WHETHER WRITTEN OR ORAL, OBTAINED BY
                          YOU FROM Insightifi, ITS EMPLOYEES OR REPRESENTATIVES SHALL CREATE ANY WARRANTY NOT EXPRESSLY
                          STATED IN THE AGREEMENT.
                        </Typography>
                      </li>
                      <li>
                        <h2>Limitation of Liability</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          YOU AGREE THAT INSIGHTIFI SHALL, IN NO EVENT, BE LIABLE FOR ANY CONSEQUENTIAL, INCIDENTAL,
                          INDIRECT, SPECIAL, PUNITIVE, OR OTHER LOSS OR DAMAGE WHATSOEVER OR FOR LOSS OF BUSINESS
                          PROFITS, BUSINESS INTERRUPTION, COMPUTER FAILURE, LOSS OF BUSINESS INFORMATION, OR OTHER LOSS
                          ARISING OUT OF OR CAUSED BY YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF INSIGHTIFI
                          HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. IN NO EVENT SHALL INSIGHTIFI’S ENTIRE
                          LIABILITY TO YOU IN RESPECT OF ANY SERVICE, WHETHER DIRECT OR INDIRECT, EXCEED FIFTY THOUSAND
                          RUPEES (₹ 50,000) OR THE FEES PAID BY YOU DURING THE TWELVE (12) MONTHS PRIOR TO THE FIRST
                          EVENT GIVING RISE TO SUCH LIABILITY, WHICHEVER IS HIGHER.
                        </Typography>
                      </li>
                      <li>
                        <h2>Indemnification</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          You agree to indemnify and hold harmless Insightifi, its officers, directors, employees,
                          suppliers, and affiliates, from and against any losses, damages, fines and expenses (including
                          attorney's fees and costs) arising out of or relating to any claims that you have used the
                          Services in violation of another party's rights, in violation of any law, in violations of any
                          provisions of the Agreement , or any other claim related to your use of the Services, except
                          where such use is authorized by Insightifi.
                        </Typography>
                      </li>
                      <li>
                        <h2>Governing law and Jurisdiction</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          Any controversy or claim arising out of or relating to the Terms shall be settled and
                          adjudicated exclusively by the courts of Chennai in accordance with the laws of India without
                          regard to conflict of law principles.
                        </Typography>
                      </li>
                      <li>
                        <h2>Suspension and Termination</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          We may suspend your user account or temporarily disable access to the whole or part of any
                          Service in the event of any suspected illegal activity, extended periods of inactivity or
                          requests by law enforcement or other government agencies. Objections to suspension or
                          disabling of user accounts should be made to <a href='#'>info@insightifi.in</a> within thirty
                          days of being notified about the suspension. We may terminate a suspended or disabled user
                          account after thirty days. We will also terminate your user account on your request. In
                          addition, we reserve the right to terminate your user account and deny the Services upon
                          reasonable belief that you have violated the Agreement and to terminate your access to any
                          Beta Service in case of unexpected technical issues or discontinuation of the Beta Service.
                          You have the right to terminate your user account if Insightifi breaches its obligations under
                          this Agreement and in such event, you will be entitled to a prorated refund of any prepaid
                          fees. Termination of user account will include denial of access to all Services, deletion of
                          information in your user account such as your email address and password and deletion of all
                          data in your user account.
                          <br />
                          <br />
                          In the event that the Partner (or Channel Partner) is offboarded or terminates, any and all
                          clients acquired by the Partner during the term of this Agreement shall remain with the
                          Company. The Company will retain the rights to continue servicing these clients without any
                          further obligations to the Partner.
                        </Typography>
                      </li>
                      <li>
                        <h2>Modification of Terms of Service</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          We may modify this Agreement upon notice to you at any time through a service announcement or
                          by sending email to your primary email address. If we make significant changes to the
                          Agreement that affect your rights, you will be provided with at least 30 days advance notice
                          of the changes by email to your primary email address. You may terminate your use of the
                          Services by providing Insightifi notice by email within 30 days of being notified of the
                          availability of the modified Agreement if the Agreement is modified in a manner that
                          substantially affects your rights in connection with use of the Services. In the event of such
                          termination, you will be entitled to a prorated refund of the unused portion of any prepaid
                          fees. Your continued use of the Service after the effective date of any change to the
                          Agreement will be deemed to be your agreement to the modified Agreement.
                        </Typography>
                      </li>
                      <li
                        style={{
                          width: '100%',
                          flexDirection: 'column'
                        }}
                      >
                        <h2>End Of Terms Of Service</h2>
                        <Typography>
                          If you have any questions or concerns regarding this Agreement, please contact us at &nbsp;
                          <a href='#' style={{ display: 'flex' }}>
                            info@insightifi.in
                          </a>
                        </Typography>
                      </li>
                    </ul>
                  </Box>
                  {/* Terms & Conditions Content ends above */}
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <FooterNoAuth />
    </>
  )
}

export default TermsConditions
