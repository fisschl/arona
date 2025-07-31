<script setup lang="ts">
import { writeS3Access, type S3AccessZod } from "@/utils/s3";
import type { FormRules } from "element-plus";
import type { infer as Infer } from "zod/mini";

const formRef = useTemplateRef("form-ref");

type FormData = Partial<Infer<typeof S3AccessZod>>;
const formData = ref<FormData>({});
const rules: FormRules<FormData> = {
  accessKeyId: [{ required: true, message: "请输入 Access Key ID", trigger: "blur" }],
  secretAccessKey: [{ required: true, message: "请输入 Secret Access Key", trigger: "blur" }],
  endpoint: [{ required: true, message: "请输入 Endpoint", trigger: "blur" }],
};

const submitForm = async () => {
  await formRef.value?.validate();
  await writeS3Access(formData.value);
};
</script>

<template>
  <ElForm
    ref="form-ref"
    :model="formData"
    class="base-form"
    :rules="rules"
    label-position="top"
    @submit.prevent="submitForm"
  >
    <h3 class="mb-4 flex items-center gap-1 text-lg">
      <ITablerLockAccess class="text-xl" />
      基础配置
    </h3>
    <ElFormItem label="Access Key ID" prop="accessKeyId">
      <ElInput
        v-model="formData.accessKeyId"
        placeholder="请输入 Access Key ID"
        clearable
        autocomplete="new-password"
      />
    </ElFormItem>
    <ElFormItem label="Secret Access Key" prop="secretAccessKey">
      <ElInput
        v-model="formData.secretAccessKey"
        type="password"
        placeholder="请输入 Secret Access Key"
        clearable
        show-password
        autocomplete="new-password"
      />
    </ElFormItem>
    <ElFormItem label="Endpoint" prop="endpoint">
      <ElInput
        v-model="formData.endpoint"
        placeholder="请输入 Endpoint"
        clearable
        autocomplete="new-password"
      />
    </ElFormItem>
    <div class="flex gap-4 pt-2">
      <ElButton type="primary" class="submit-button" native-type="submit"> 提交 </ElButton>
    </div>
  </ElForm>
</template>

<style scoped>
.base-form {
  width: 300px;
  margin: 5rem auto;
}

.submit-button {
  width: 50%;
}
</style>
