import gql from 'graphql-tag'

export const slices = gql`
  fragment ImageFields on Image {
    __typename
    id
    title
    url
    contentType
    width
    height
  }

  fragment AssetFields on Asset {
    __typename
    id
    title
    url
    contentType
  }

  fragment TimelineFields on TimelineSlice {
    __typename
    id
    title
    events {
      id
      title
      date
      numerator
      denominator
      label
      body {
        ...HtmlFields
      }
      tags
      link
    }
  }

  fragment MailingListSignupFields on MailingListSignupSlice {
    __typename
    id
    title
    description
    inputLabel
    buttonText
  }

  fragment StoryFields on StorySlice {
    __typename
    id
    readMoreText
    stories {
      title
      intro
      label
      readMoreText
      date
      logo {
        ...ImageFields
      }
      body
      linkedPage
      link
    }
  }

  fragment LatestNewsFields on LatestNewsSlice {
    __typename
    id
    title
    news {
      id
      title
      subtitle
      slug
      date
      intro
      image {
        ...ImageFields
      }
    }
  }

  fragment LinkCardFields on LinkCardSlice {
    __typename
    id
    title
    cards {
      title
      body
      link
      linkText
    }
  }

  fragment HeadingFields on HeadingSlice {
    __typename
    id
    title
    body
  }

  fragment LogoListFields on LogoListSlice {
    __typename
    id
    title
    body
    images {
      ...ImageFields
    }
  }

  fragment BulletListFields on BulletListSlice {
    __typename
    id
    bullets {
      ... on IconBullet {
        __typename
        id
        title
        body
        url
        linkText
        icon {
          ...ImageFields
        }
      }
      ... on NumberBulletGroup {
        __typename
        id
        defaultVisible
        bullets {
          id
          title
          body
        }
      }
    }
  }

  fragment FaqListFields on FaqList {
    __typename
    id
    title
    questions {
      id
      question
      answer {
        ...HtmlFields
      }
    }
  }

  fragment ConnectedComponentFields on ConnectedComponent {
    __typename
    id
    title
    json
    componentType: type
  }

  fragment StatisticsFields on Statistics {
    __typename
    id
    title
    statistics {
      id
      value
      label
    }
  }

  fragment ProcessEntryFields on ProcessEntry {
    __typename
    id
    type
    processTitle
    processLink
    openLinkInModal
    buttonText
  }

  fragment HtmlFields on Html {
    __typename
    id
    document
  }

  fragment EmbeddedVideoFields on EmbeddedVideo {
    __typename
    id
    title
    url
  }

  fragment SectionWithImageFields on SectionWithImage {
    __typename
    id
    title
    image {
      ...ImageFields
    }
    html {
      ...HtmlFields
    }
  }

  fragment TabSectionFields on TabSection {
    __typename
    id
    title
    tabs {
      tabTitle
      contentTitle
      image {
        ...ImageFields
      }
      body {
        ...HtmlFields
      }
    }
  }

  fragment TeamListFields on TeamList {
    __typename
    id
    teamMembers {
      name
      title
      image {
        ...ImageFields
      }
    }
  }

  fragment ContactUsFields on ContactUs {
    __typename
    id
    title
    required
    invalidPhone
    invalidEmail
    labelName
    labelPhone
    labelEmail
    labelSubject
    labelMessage
    submitButtonText
    successMessage
    errorMessage
  }

  fragment LocationFields on Location {
    __typename
    id
    title
    subTitle
    address
    link {
      text
      url
    }
    background {
      ...ImageFields
    }
  }

  fragment TellUsAStoryFields on TellUsAStory {
    __typename
    id
    introTitle
    introImage {
      title
      url
    }
    introDescription {
      ...HtmlFields
    }
    instructionsTitle
    instructionsDescription {
      ...HtmlFields
    }
    firstSectionTitle
    organizationLabel
    organizationPlaceholder
    organizationInputErrorMessage
    dateOfStoryLabel
    dateOfStoryPlaceholder
    dateOfStoryInputErrorMessage
    secondSectionTitle
    subjectLabel
    subjectPlaceholder
    subjectInputErrorMessage
    messageLabel
    messagePlaceholder
    messageInputErrorMessage
    thirdSectionTitle
    instructionsImage {
      title
      url
    }
    nameLabel
    namePlaceholder
    nameInputErrorMessage
    emailLabel
    emailPlaceholder
    emailInputErrorMessage
    publicationAllowedLabel
    submitButtonTitle
    errorMessageTitle
    SuccessMessageTitle
    tellUsAStorySuccessMessage: successMessage {
      ...HtmlFields
    }
  }

  fragment AllSlices on Slice {
    ...TimelineFields
    ...MailingListSignupFields
    ...StoryFields
    ...LatestNewsFields
    ...LinkCardFields
    ...HeadingFields
    ...LogoListFields
    ...BulletListFields
    ...FaqListFields
    ...StatisticsFields
    ...ProcessEntryFields
    ...HtmlFields
    ...ImageFields
    ...AssetFields
    ...EmbeddedVideoFields
    ...SectionWithImageFields
    ...TabSectionFields
    ...TeamListFields
    ...ContactUsFields
    ...LocationFields
    ...TellUsAStoryFields
    ...ConnectedComponentFields
  }
`

export const pages = gql`
  fragment AboutPageFields on AboutPage {
    __typename
    id
    slug
    title
  }

  fragment AboutSubPageFields on AboutSubPage {
    __typename
    id
    slug
    title
  }

  fragment AdgerdirFrontpageFields on AdgerdirFrontpage {
    __typename
    id
    slug
    title
  }

  fragment AdgerdirPageFields on AdgerdirPage {
    __typename
    id
    slug
    title
  }

  fragment ArticleFields on Article {
    __typename
    id
    slug
    title
  }

  fragment SubArticleFields on SubArticle {
    __typename
    id
    slug
    title
  }

  fragment LifeEventPageFragmentFields on LifeEventPage {
    __typename
    id
    slug
    title
  }

  fragment NewsFragmentFields on News {
    __typename
    id
    slug
    title
  }

  fragment ArticleCategoryFragmentFields on ArticleCategory {
    __typename
    id
    slug
    title
  }

  fragment AllPages on Page {
    ...AboutPageFields
    ...AboutSubPageFields
    ...AdgerdirFrontpageFields
    ...AdgerdirPageFields
    ...ArticleFields
    ...SubArticleFields
    ...LifeEventPageFragmentFields
    ...NewsFragmentFields
    ...ArticleCategoryFragmentFields
  }
`
