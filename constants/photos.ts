import type { Photo } from './detail-page';

/** Photos extracted from the design file (public/images). Sizes are the intrinsic pixel dimensions. */
export const PHOTOS = {
  teenCelebrating: {
    src: '/images/teen-celebrating.webp',
    alt: 'Teenage girl in a checked shirt laughing and celebrating',
    width: 1374,
    height: 1263,
  },
  teenBoyPlaid: {
    src: '/images/teen-boy-plaid.webp',
    alt: 'Smiling teenage boy in a checked shirt',
    width: 815,
    height: 1210,
  },
  threeChildren: {
    src: '/images/three-children.webp',
    alt: 'Three young children standing together and smiling',
    width: 1117,
    height: 1840,
  },
  puzzleHands: {
    src: '/images/puzzle-hands.webp',
    alt: 'Child holding up both palms covered in colourful jigsaw-piece stickers',
    width: 2000,
    height: 1077,
  },
  teenGroup: {
    src: '/images/teen-group.webp',
    alt: 'Group of smiling teenagers with backpacks standing together',
    width: 1984,
    height: 1056,
  },
  teensWalking: {
    src: '/images/teens-walking.webp',
    alt: 'Group of students holding folders and leaning together, smiling',
    width: 1941,
    height: 860,
  },
  emptyClassroom: {
    src: '/images/empty-classroom.webp',
    alt: 'Bright classroom with desks, books, an apple and a globe',
    width: 2000,
    height: 1335,
  },
  girlPeeking: {
    src: '/images/girl-peeking.webp',
    alt: 'Young girl peeking over the edge with her fingers gripping the top',
    width: 1230,
    height: 725,
  },
  classroomGirl: {
    src: '/images/classroom-girl.webp',
    alt: 'Girl in a classroom turning round from her desk to smile',
    width: 2000,
    height: 1334,
  },
  studentsTablet: {
    src: '/images/students-tablet.webp',
    alt: 'Teacher and a group of pupils gathered round a tablet',
    width: 2000,
    height: 1333,
  },
  teenFriends: {
    src: '/images/teen-friends.webp',
    alt: 'Five young people with their arms round each other, smiling at the camera',
    width: 2000,
    height: 1333,
  },
  childrenOutdoors: {
    src: '/images/children-outdoors.webp',
    alt: 'Line of smiling children standing together outdoors',
    width: 2000,
    height: 1334,
  },
  girlOnlineLesson: {
    src: '/images/girl-online-lesson.webp',
    alt: 'Girl taking part in an online lesson on her laptop',
    width: 2000,
    height: 1334,
  },
  boyHeadphonesLaptop: {
    src: '/images/boy-headphones-laptop.webp',
    alt: 'Boy wearing headphones writing notes during a video lesson',
    width: 2000,
    height: 1335,
  },
} satisfies Record<string, Photo>;
