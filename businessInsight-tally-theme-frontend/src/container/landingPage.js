// ** MUI Components
import { Button } from '@mui/material'
import Image from 'next/image'
import FooterNoAuth from 'src/@core/layouts/landingComponent/noAuthFooter'
import KeyFeatureVector1 from '../assets/images/businessImg1.svg'
import KeyFeatureVector2 from '../assets/images/businessImg2.svg'
import KeyFeatureVector3 from '../assets/images/businessImg3.svg'
import LeftVector from '../assets/images/LeftVector.svg'
import RightVector from '../assets/images/RightVector1.svg'
import GraphVector from '../assets/images/graphImg.svg'
import RightVectorSecond from '../assets/images/RightVector2.svg'
import card1 from '../assets/images/GrouphandShake.svg'
import card2 from '../assets/images/GroupReport.svg'
import card3 from '../assets/images/GroupStore.svg'
import styles from './landingPage.module.css'
import FeatureComponent from './FeatureList'
import BlogComponent from './BlogSection'
import { useState } from 'react'
import { useRouter } from 'next/router'

const LandingPage = () => {
  const navigate = useRouter()

  const handleRequestDemo = () => {
    navigate.push('/request-us')
  }

  return (
    <div className={styles.body}>
      {/* section 1 */}
      <div className={styles.section1Div}>
        <Image className={styles.leftvector} src={LeftVector} alt='leftvector' />
        <Image className={styles.rightvector} src={RightVector} alt='RightVector' />
        <Image className={styles.rightvectorSecond} src={RightVectorSecond} alt='RightVectorSecond' />
        <div className={styles.containerBlockCenter}>
          <div style={{ zIndex: 2 }} className={styles.container}>
            <div>
              <div className={styles.section1BlockDiv}>
                <div className={styles.LeftGrid}>
                  <div>
                    <div className={`${styles.WelcomeTextSmall}`}>Welcome to</div>
                    <div className={`${styles.WelcomeTextBig} ${styles.blueText}`}>Insightifi</div>
                    <div className={`${styles.WelcomeTextSmall} ${styles.blueText}`} style={{ paddingBottom: '24px' }}>
                      Unleash the Power of Data Insights
                    </div>
                    <div className={styles.WelcomeContent}>
                      Insightifi offers custom insights and dashboards that seamlessly integrate with your data systems.
                      Empower informed decision-making, enhance efficiency, and drive business growth. Transform your
                      data into strategic insights and discover hidden opportunities with Insightifi.
                    </div>
                    <div>
                      <Button variant='contained' onClick={handleRequestDemo} className={styles.ExploreBtn}>
                        Request a Demo
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={styles.RightGrid}>
                  <Image className={styles.ComputerVector} src={GraphVector} alt='GraphVector' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className={styles.section2Div}>
        <div className={styles.containerBlockCenter}>
          <div className={styles.container}>
            <div>
              <div className={styles.blockCenter}>
                <div className={styles.section2FirstDiv}>
                  <div className={styles.whyChooseHeader}>Why should you choose insightifi?</div>
                  <div className={styles.whyChooseContent}>
                    Our commitment to innovation, reliability, and customer satisfaction sets us apart, ensuring that
                    you have the tools and support you need to succeed in today's data-driven world. Choose Insightifi
                    and discover the difference for yourself.
                  </div>
                </div>
              </div>
              <FeatureComponent />
            </div>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div>
        <div className={styles.blockCenter}>
          <div className={styles.KeyFeatureHeader}>Key Features</div>
        </div>
        <div className={styles.section3FirstDiv}>
          <div className={styles.containerBlockCenter}>
            <div className={styles.container}>
              <div className={styles.keyFeatureBlock}>
                <div className={styles.keyFeatureGrid1}>
                  <div style={{ padding: '10px 25px' }}>
                    <div className={styles.keyFeatureInnerHeader}>Dynamic Insights</div>
                    <div className={styles.keyFeatureInnerContent}>
                      Embrace the power of real-time, dynamic insights that adapt to your evolving data, providing
                      a comprehensive and up-to-the-minute perspective.
                    </div>
                  </div>
                </div>
                <div className={styles.keyFeatureGrid2}>
                  <Image className={styles.KeyFeatureVectorImage} src={KeyFeatureVector1} alt='KeyFeatureVector1' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 4 */}
      <div className={styles.section3childDiv}>
        <div>
          <div className={styles.containerBlockCenter}>
            <div className={styles.container}>
              <div className={styles.keyFeatureBlock2}>
                <div className={styles.keyFeatureGrid2}>
                  <Image className={styles.KeyFeatureVectorImage} src={KeyFeatureVector3} alt='KeyFeatureVector2' />
                </div>
                <div className={styles.keyFeatureGrid1}>
                  <div style={{ padding: '10px 25px' }}>
                    <div className={styles.keyFeatureInnerHeader}>Easy to Interpret</div>
                    <div className={styles.keyFeatureInnerContent}>
                      Our user-friendly interface ensures that even complex data becomes clear and comprehensible,
                      empowering users at every level to make informed decisions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 5 */}
      <div>
        <div className={styles.section3FirstDiv}>
          <div className={styles.containerBlockCenter}>
            <div className={styles.container}>
              <div className={styles.keyFeatureBlock}>
                <div className={styles.keyFeatureGrid1}>
                  <div style={{ padding: '10px 25px' }}>
                    <div className={styles.keyFeatureInnerHeader}>Discover untapped Data Points</div>
                    <div className={styles.keyFeatureInnerContent}>
                      Uncover hidden opportunities and trends through our advanced analytics, revealing untapped data
                      points that could transform the way you understand your information.
                    </div>
                  </div>
                </div>

                <div className={styles.keyFeatureGrid2}>
                  <Image className={styles.KeyFeatureVectorImage} src={KeyFeatureVector2} alt='KeyFeatureVector3' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section2Div}>
        <div className={styles.containerBlockCenter}>
          <div className={styles.container}>
            <div>
              <div className={styles.blockCenter}>
                <div className={styles.section2FirstDiv}>
                  <div className={styles.whyChooseHeader}>How to use Insightifi ?</div>
                </div>
              </div>
              <div className={styles.section2SecondDiv}>
                <div className={styles.cardBlock}>
                  <div className={styles.GridCenter}>
                    <div className={styles.cardMain}>
                      <div className={styles.cardImageBlock}>
                        <div className={styles.cardImageDiv}>
                          <div>
                            <Image src={card1} alt='card1' />
                          </div>
                        </div>
                      </div>
                      <div className={styles.cardContentBlock}>
                        <div>
                          <div>
                            <div className={styles.cardContentHeader}>
                              Effortlessly onboard by Subscribing to our plans
                            </div>
                            <div className={styles.cardContent}>
                              Easily register and login using your credentials. Provide your data source to build
                              analytical reports.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.GridCenter}>
                    <div className={styles.cardMain}>
                      <div className={styles.cardImageBlock}>
                        <div className={styles.cardImageDiv}>
                          <div>
                            <Image src={card2} alt='card2' />
                          </div>
                        </div>
                      </div>
                      <div className={styles.cardContentBlock}>
                        <div>
                          <div>
                            <div className={styles.cardContentHeader}>
                              Collaborate & Share Reports Across the Organization
                            </div>
                            <div className={styles.cardContent}>
                              Easily share insightful reports within your organization, ensuring everyone has access to
                              crucial information.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.GridCenter}>
                    <div className={styles.cardMain}>
                      <div className={styles.cardImageBlock}>
                        <div className={styles.cardImageDiv}>
                          <div>
                            <Image src={card3} alt='card3' />
                          </div>
                        </div>
                      </div>
                      <div className={styles.cardContentBlock}>
                        <div>
                          <div>
                            <div className={styles.cardContentHeader}>
                              Empower Your Team to Make Data-Driven Decisions
                            </div>
                            <div className={styles.cardContent}>
                              Leverage reliable data to minimize guesswork and ensure every decision is backed by
                              accurate information.
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
      </div>
      <BlogComponent />
      <FooterNoAuth />
    </div>
  )
}

export default LandingPage
