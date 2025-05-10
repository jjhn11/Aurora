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
import CubiclesView from '@/views/Library/CubiclesView.vue'
import BookView from '@/views/Library/BookView.vue'
import FavoritesView from '@/views/User/FavoritesView.vue'
import CatalogueView from '@/views/Library/CatalogueView.vue'
import AdminEventsView from '@/views/Admin/AdminEventsView.vue'
import ProfanityTestView from '@/views/Test/ProfanityView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

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
    path: '/biblioteca',
    name: 'library',
    component: LibraryView,
  },
  {
    path: '/biblioteca/catalogo',
    name: 'catalogue',
    component: CatalogueView,
  },
  {
    path: '/biblioteca/libro/:id',
    name: 'library-book',
    component: BookView,
    props: true,
  },
  {
    path: '/biblioteca/cubiculos',
    name: 'cubicles',
    component: CubiclesView,
  },
  {
    path: '/eventos',
    name: 'events',
    component: EventsView,
  },
  {
    path: '/eventos/culturales',
    name: 'cultural-events',
    component: CulturalEventsView,
  },
  {
    path: '/eventos/deportivos',
    name: 'sports-events',
    component: SportsEventsView,
  },
  {
    path: '/eventos/escolares',
    name: 'school-events',
    component: SchoolEventsView,
  },

  {
    path: '/comunidad/cultural',
    name: 'community-cultural',
    component: CommunityCulturalView,
  },
  {
    path: '/comunidad/deportes',
    name: 'community-sports',
    component: CommunitySportsView,
  },
  {
    path: '/comunidad/videojuegos',
    name: 'community-gaming',
    component: CommunityGamingView,
  },
  {
    path: '/comunidad/recreativas',
    name: 'community-recreational',
    component: CommunityRecreationalView,
  },

  {
    path: '/test/profanity',
    name: 'ProfanityTest',
    component: ProfanityTestView,
    meta: {
      title: 'Test de Profanidad'
    }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
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