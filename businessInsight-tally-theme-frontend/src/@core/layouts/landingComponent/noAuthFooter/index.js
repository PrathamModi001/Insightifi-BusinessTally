import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedIn from '@mui/icons-material/LinkedIn'
import classNames from 'classnames'
import Image from 'next/image'
import InsightifiLogoFooter from '../../../../assets/images/InsightifiLogoFooter.svg'
import callIcon from '../../../../assets/images/callIcon.svg'
import locationIcon from '../../../../assets/images/locationIcon.svg'
import mailIcon from '../../../../assets/images/mailIcon.svg'
import styles from './styles.module.css'
import { useRouter } from 'next/router'

const FooterNoAuth = () => {
  const router = useRouter()

  return (
    <div className={classNames(styles.containerBlockCenter, styles.body)}>
      <div className={styles.container}>
        <div className={styles.footerDiv}>
          <div className={styles.containerBlockCenter}>
            <div className={styles.container}>
              <div className={styles.footerInnerMain}>
                <div className={styles.footerInnerBlock1}>
                  <div className={styles.footerLeftDiv}>
                    <div>
                      <Image
                        src={InsightifiLogoFooter}
                        className={styles.footerImageBottomPedding}
                        alt='InsightifiLogo'
                      />
                      <div className={styles.leftDivContent}>
                        Insightifi offers custom insights and dashboards that seamlessly integrate with your data
                        systems. Empower informed decision-making, enhance efficiency, and drive business growth.
                        Transform your data into strategic insights and discover hidden opportunities with Insightifi.
                      </div>
                      <div className={styles.footerRightDiv}>
                        <div className={classNames(styles.footerRightList, styles.pointer)}>
                          <FacebookIcon className={styles.footerRightIconSize} />
                        </div>
                        <div className={classNames(styles.footerRightList, styles.pointer)}>
                          <TwitterIcon className={styles.footerRightIconSize} />
                        </div>
                        <div className={classNames(styles.footerRightList, styles.pointer)}>
                          <LinkedIn className={styles.footerRightIconSize} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.footerInnerBlock2}>
                  <div className={styles.footerCenterDiv}>
                    <div>
                      <div className={classNames(styles.footerListHeader, styles.pointer)}>Quick Links</div>
                      <div
                        className={classNames(styles.footerCenterList, styles.pointer)}
                        onClick={() => {
                          router.push('/faq')
                        }}
                      >
                        FAQ
                      </div>
                      <div
                        className={classNames(styles.footerCenterList, styles.pointer)}
                        onClick={() => {
                          router.push('/blogs')
                        }}
                      >
                        Blogs
                      </div>
                      <div className={classNames(styles.footerCenterList, styles.pointer)}>Pricing Plans</div>
                      <div
                        className={classNames(styles.pointer)}
                        onClick={() => {
                          router.push('/terms-conditions')
                        }}
                      >
                        Terms & Conditions
                      </div>
                    </div>
                  </div>
                  <div className={styles.footerRightDiv}>
                    <div>
                      <div className={classNames(styles.footerListHeader, styles.pointer)}>Contact Us</div>
                      <div
                        className={classNames(styles.footerCenterList, styles.pointer, styles.rightDivContentCenter)}
                      >
                        <div>
                          <Image src={callIcon} alt='mailIcon' />
                        </div>
                        <div style={{ paddingLeft: '13px' }}>+91 70431 22287</div>
                      </div>
                      <div
                        className={classNames(styles.footerCenterList, styles.pointer, styles.rightDivContentCenter)}
                      >
                        <div>
                          <Image src={mailIcon} alt='mailIcon' />
                        </div>
                        <div style={{ paddingLeft: '13px' }}>info@insightifi.in</div>
                      </div>
                      <div className={classNames(styles.pointer, styles.rightDivContentCenter)}>
                        <div>
                          <Image src={locationIcon} alt='mailIcon' />
                        </div>
                        <div style={{ paddingLeft: '13px' }}>
                          401, Shivalik 5, <br /> Mahalaxmi Cross Roads, <br /> Paldi Ahmedabad , <br />
                          Gujarat, India – 380007.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterNoAuth
