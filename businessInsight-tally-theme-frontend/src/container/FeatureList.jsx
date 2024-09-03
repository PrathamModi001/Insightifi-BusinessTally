import React, { startTransition } from 'react'
import { Container, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import rightIcon from '../assets/images/VectorRight.svg'
import Image from 'next/image'
import styles from './landingPage.module.css'

const featuresLeft = [
  'Actionable Insights Through Advanced Analytics',
  'Cutting-Edge Technology',
  'Customizable Features/Filters'
]

const featuresRight = [
  'Seamless Integration Of Data From Multiple Sources',
  'Commitment To Innovation',
  'Growth Backed With Data'
]

const FeatureList = ({ features }) => (
  <List className={styles.listFeature}>
    {features.map((feature, index) => (
      <ListItem key={index}>
        <ListItemIcon className={styles.checkIcon}>
          <Image src={rightIcon} alt='right' />
        </ListItemIcon>
        <ListItemText primary={feature} />
      </ListItem>
    ))}
  </List>
)

const FeatureComponent = () => {
  return (
    <Container maxWidth='md'>
      <Grid className={styles.featureSection} container spacing={3}>
        <Grid item xs={12} md={6}>
          <FeatureList features={featuresLeft} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FeatureList features={featuresRight} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default FeatureComponent
