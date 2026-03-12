<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between gap-4 mb-6 flex-wrap">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
          <div class="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
            <FolderGit2 class="w-4 h-4 text-indigo-400" />
          </div>
        </div>
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-white">Projects</h1>
          <p class="text-gray-500 text-xs">{{ loading ? 'Loading...' : `${projects.length} projects total` }}</p>
        </div>
      </div>
      <button @click="showCreate = true" class="relative group shrink-0">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur group-hover:opacity-80 transition duration-300" />
        <div class="relative flex items-center gap-2 px-4 py-2.5 bg-[#030014] rounded-xl border border-white/10">
          <Plus class="w-4 h-4 text-indigo-400" />
          <span class="text-sm text-gray-200">New Project</span>
        </div>
      </button>
    </div>

    <!-- Create Modal -->
    <DashboardModal v-if="showCreate" title="Add New Project" @close="showCreate = false">
      <ProjectForm @submit="handleCreate" @cancel="showCreate = false" :uploading="uploading" submit-label="Save Project" />
    </DashboardModal>

    <!-- Edit Modal -->
    <DashboardModal v-if="editProject" title="Edit Project" @close="editProject = null">
      <ProjectForm :initial="editProject" @submit="handleEdit" @cancel="editProject = null" :uploading="uploading" submit-label="Update Project" />
    </DashboardModal>

    <!-- Projects Grid -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <SkeletonCard v-for="i in 6" :key="i" />
    </div>
    <DashboardCard v-else-if="projects.length === 0">
      <div class="p-16 text-center">
        <FolderGit2 class="w-10 h-10 text-gray-700 mx-auto mb-3" />
        <p class="text-gray-500 text-sm">No projects yet. Create your first one!</p>
      </div>
    </DashboardCard>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" @delete="deleteProject" @edit="editProject = $event" />
    </div>
  </div>
</template>

<script setup>
import { FolderGit2, Plus, Trash2, Upload, X, ImageIcon, ExternalLink, Github, Pencil } from 'lucide-vue-next'

const { supabase } = useSupabase()
const projects = ref([])
const loading = ref(true)
const showCreate = ref(false)
const editProject = ref(null)
const uploading = ref(false)

const normalizeProject = (project = {}) => ({
  ...project,
  Title: project.Title ?? project.title ?? '',
  Description: project.Description ?? project.description ?? '',
  Img: project.Img ?? project.img ?? '',
  Link: project.Link ?? project.link ?? '',
  Github: project.Github ?? project.github ?? '',
  TechStack: project.TechStack ?? project.tech_stack ?? [],
  Features: project.Features ?? project.features ?? [],
})

const fetchProjects = async () => {
  loading.value = true
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  projects.value = (data || []).map(normalizeProject)
  loading.value = false
}

onMounted(() => { fetchProjects() })

const uploadImage = async (f) => {
  const fileName = `${Date.now()}-${f.name}`
  await supabase.storage.from('project-images').upload(fileName, f)
  const { data } = supabase.storage.from('project-images').getPublicUrl(fileName)
  return data.publicUrl
}

const handleCreate = async ({ form, file }) => {
  uploading.value = true
  let imgUrl = ''
  if (file) imgUrl = await uploadImage(file)
  const { error } = await supabase.from('projects').insert({
    title: form.Title,
    description: form.Description,
    img: imgUrl,
    tech_stack: form.TechStack.split(',').map(s => s.trim()).filter(Boolean),
    features: form.Features.split(',').map(s => s.trim()).filter(Boolean),
    link: form.Link,
    github: form.Github,
  })
  if (error) {
    alert(error.message)
    uploading.value = false
    return
  }
  showCreate.value = false
  uploading.value = false
  fetchProjects()
}

const handleEdit = async ({ form, file }) => {
  uploading.value = true
  let imgUrl = editProject.value.Img || ''
  if (file) imgUrl = await uploadImage(file)
  const { error } = await supabase.from('projects').update({
    title: form.Title,
    description: form.Description,
    img: imgUrl,
    tech_stack: form.TechStack.split(',').map(s => s.trim()).filter(Boolean),
    features: form.Features.split(',').map(s => s.trim()).filter(Boolean),
    link: form.Link,
    github: form.Github,
  }).eq('id', editProject.value.id)
  if (error) {
    alert(error.message)
    uploading.value = false
    return
  }
  editProject.value = null
  uploading.value = false
  fetchProjects()
}

const deleteProject = async (id) => {
  if (!confirm('Delete this project?')) return
  await supabase.from('projects').delete().eq('id', id)
  fetchProjects()
}
</script>
