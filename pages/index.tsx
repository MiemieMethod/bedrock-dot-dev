import React, { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'

import Layout from '../components/layout'
import VersionChooser from '../components/version-chooser'

import { getBedrockVersions, getTags, TagsResponse } from '../lib/files'

import { BedrockVersions } from './api/docs/list'

type Props = {
  versions: BedrockVersions
  tags: TagsResponse
}

const IndexPage: FunctionComponent<Props> = ({ versions, tags }) => {
  return (
    <Layout title='bedrock.dev'>
      <div className='main-container'>
        <div className='d-flex h-100 justify-content-center align-items-center'>
          <VersionChooser versions={versions} tags={tags} />
        </div>
      </div>
      <style jsx>{`
        .main-container {
          height: calc(50vh - 4rem)
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const bedrockVersions = await getBedrockVersions()
  const tags = await getTags()

  return { props: { versions: bedrockVersions, tags } }
}

export default IndexPage