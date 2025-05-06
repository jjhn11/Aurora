import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EventsView from '@/views/Events/EventsView.vue'
import CulturalEventsView from '@/views/Events/CulturalEventsView.vue'
import SportsEventsView from '@/views/Events/SportsEventsView.vue'
import SchoolEventsView from '@/views/Events/SchoolEventsView.vue'
import CommunityCulturalView from '@/views/Community/CommunityCulturalView.vue'
import CommunitySportsView from '@/views/Community/CommunitySportsView.vue'
import CommunityGamingView from '@/views/Community/CommunityGamingView.vue'
import CommunityRecreationalView from '@/views/Community/CommunityRecreationalView.vue'
import ProfileView from '@/views/User/ProfileView.vue'
import LibraryView from '@/views/Library/LibraryView.vue'
import BookView from '@/views/Library/BookView.vue'
import FavoritesView from '@/views/User/FavoritesView.vue'
import CatalogueView from '@/views/Library/CatalogueView.vue'
import AdminEventsView from '@/views/Admin/AdminEventsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/admin-eventos',
    name: 'admin-events',
    component: AdminEventsView,
  },

  {
    path: '/library',
    name: 'library',
    component: LibraryView,
  },
  {
    path: '/library/catalogue',
    name: 'catalogue',
    component: CatalogueView,
  },

  {
    path: '/events',
    name: 'events',
    component: EventsView,
  },
  {
    path: '/events/cultural',
    name: 'cultural-events',
    component: CulturalEventsView,
  },
  {
    path: '/events/sports',
    name: 'sports-events',
    component: SportsEventsView,
  },
  {
    path: '/events/school',
    name: 'school-events',
    component: SchoolEventsView,
  },

  {
    path: '/community/cultural',
    name: 'community-cultural',
    component: CommunityCulturalView,
  },
  {
    path: '/community/sports',
    name: 'community-sports',
    component: CommunitySportsView,
  },
  {
    path: '/community/gaming',
    name: 'community-gaming',
    component: CommunityGamingView,
  },
  {
    path: '/community/recreational',
    name: 'community-recreational',
    component: CommunityRecreationalView,
  },

  {
    path: '/user/profile',
    name: 'profile',
    component: ProfileView,
  },

  {
    path: '/user/favorites',
    name: 'favorites',
    component: FavoritesView,
  },

  {
    path: '/library/book/:id',
    name: 'library-book',
    component: BookView,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router