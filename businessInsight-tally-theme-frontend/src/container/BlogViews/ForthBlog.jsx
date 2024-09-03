import React from 'react'
import styles from '../BlogDetails.module.css'
import CircleIcon from '@mui/icons-material/Circle'
import BlogImage from '../../../public/images/blog-details-image.png'

// import BlogImage from '../../assets/images/blogImg4.png'
import Image from 'next/image'
import classNames from 'classnames'
import BlogComp from '../BlogComp'
import FooterNoAuth from 'src/@core/layouts/landingComponent/noAuthFooter'

const SecondBlog = () => {
  return (
    <>
      <div className={styles.firstPageContent}>
        <h1 className={styles.blogTitle}>
          Empowering Your Team with Collaborative Analytics: Insights for Every Stakeholder
        </h1>
        <div className={styles.blogSubTitle}>
          <p className={styles.subPara1}>Team insightifi</p>
          <div className={styles.dateAndTime}>
            <p className={styles.subPara2}>Apr 15, 2024</p>
            <CircleIcon className={styles.timeIcon} />
            <p className={styles.subPara3}>3 Min read</p>
          </div>
        </div>
        <Image src={BlogImage} alt='' className={styles.blogDetailsImage} />
        <h1 className={styles.blogPageTitleHeader}>Introduction</h1>
        <p className={styles.blogSubParagraph}>
          In today's era, by empowering teams to work together and share insights, businesses can unlock new
          opportunities, drive innovation, and achieve better outcomes. Collaborative analytics enables stakeholders
          across the organization to access, analyze, and act on data collectively, driving informed decision-making and
          driving business growth.
        </p>
        <br />
        <p className={styles.blogSubParagraph}>
          At Insightifi, we're passionate about empowering businesses to harness the power of collaborative analytics.
          Here we'll explore how collaborative analytics can empower your team and provide insights for every
          stakeholder.
        </p>
        <h1 className={classNames(styles.blogPageTitleHeader, styles.secondIntroduction)}>
          What is Collaborative Analytics?
        </h1>
        <p className={styles.blogSubParagraph}>
          Collaborative analytics is a process that enables teams to work together to analyze and interpret data, share
          insights, and make informed decisions. By breaking down silos and fostering cross-functional collaboration,
          collaborative analytics empowers stakeholders across the organization to leverage data effectively and drive
          business outcomes by sharing the access across the organization and
        </p>
      </div>
      <div className={styles.secondPageContent}>
        <h1 className={classNames(styles.blogPageTitleHeader, styles.additionalTitle2)}>
          Key Benefits of Collaborative Analytics
        </h1>
        <ol className={styles.unOrderedList}>
          <li>
            <span className={classNames(styles.blogSubParagraph, styles.additionalSubPara)}>Shared Insights: </span>
            Collaborative analytics enables teams to share insights and best practices, facilitating knowledge sharing
            and fostering a culture of continuous learning and improvement.
          </li>
          <br />
          <li>
            <span className={classNames(styles.blogSubParagraph, styles.additionalSubPara)}>
              Faster Decision-Making:{' '}
            </span>
            By enabling real-time collaboration and access to up-to-date data, collaborative analytics accelerates the
            decision-making process, allowing teams to respond quickly to changing market dynamics and customer needs.
          </li>
          <br />
          <li>
            <span className={classNames(styles.blogSubParagraph, styles.additionalSubPara)}>Improved Alignment: </span>
            Collaborative analytics helps align stakeholders across the organization around common goals and objectives,
            ensuring everyone is working towards the same outcomes and driving organizational alignment.
          </li>
          <br />
          <li>
            <span className={classNames(styles.blogSubParagraph, styles.additionalSubPara)}>
              Increased Innovation:{' '}
            </span>
            By bringing together diverse perspectives and expertise, collaborative analytics encourages innovation and
            creativity, driving the development of new ideas, products, and services that drive business growth.
          </li>
        </ol>
        <h1 className={classNames(styles.blogPageTitleHeader, styles.additionalTitle2)}>
          Insightifi's Approach to Collaborative Analytics
        </h1>
        <p className={styles.blogSubParagraph}>
          At Insightifi, we're committed to empowering businesses to harness the power of collaborative analytics. Our
          comprehensive platform offers a range of features and capabilities designed to facilitate collaboration and
          drive better business outcomes, including:
        </p>
        <br />
        <ol className={styles.unOrderedList}>
          <li>
            <span className={classNames(styles.blogSubParagraph, styles.additionalSubPara)}>Shared Reports: </span>
            Insightifi provides access where teams can collaborate on data analysis projects, share insights, and
            collaborate in real-time.
          </li>
          <br />
          <li>
            <span className={classNames(styles.blogSubParagraph, styles.additionalSubPara)}>Collaboration: </span>
            Insightifi's collaborative dashboards enable teams to share interactive dashboards that provide actionable
            insights for every stakeholder.
          </li>
          <br />
          <li>
            <span className={classNames(styles.blogSubParagraph, styles.additionalSubPara)}>
              Role-Based Access Controls:{' '}
            </span>
            Insightifi's role-based access controls ensure that each stakeholder has access to the data and insights
            they need to perform their role effectively, while maintaining data security and privacy.
          </li>
        </ol>
        <h1 className={classNames(styles.blogPageTitleHeader, styles.additionalTitle2)}>Conclusion</h1>
        <p className={classNames(styles.blogSubParagraph, styles.conclusionPara)}>
          Empowering your team with collaborative analytics is essential for driving business success in today's
          competitive landscape. By breaking down silos, fostering cross-functional collaboration, and enabling
          stakeholders to access, analyze, and act on data together, businesses can unlock new opportunities, drive
          innovation, and achieve better outcomes. Ready to empower your team with collaborative analytics? Sign up for
          Insightifi today and take your business to the next level.
        </p>
        <br />
      </div>
    </>
  )
}

export default SecondBlog
