<script setup lang="ts">
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { refAutoReset } from "@vueuse/core";
import { set } from "lodash-es";
import {
  createS3Service,
  readS3Access,
  readS3Bucket,
  writeS3Access,
  writeS3Bucket,
  type S3AccessZod,
  type S3BucketZod,
} from "@/utils/s3";
import type { FormRules } from "element-plus";
import type { infer as Infer } from "zod/mini";

const formRef = useTemplateRef("form-ref");

type FormData = Partial<Infer<typeof S3AccessZod> & Infer<typeof S3BucketZod>>;
const formData = ref<FormData>({
  forcePathStyle: false,
});

onMounted(async () => {
  const access = await readS3Access();
  const bucket = await readS3Bucket();
  formData.value = { ...access, ...bucket };
});

const rules: FormRules<FormData> = {
  region: [{ required: true, message: "请输入 Region", trigger: "blur" }],
  "credentials.accessKeyId": [{ required: true, message: "请输入 Access Key ID", trigger: "blur" }],
  "credentials.secretAccessKey": [
    { required: true, message: "请输入 Secret Access Key", trigger: "blur" },
  ],
  endpoint: [{ required: true, message: "请输入 Endpoint", trigger: "blur" }],
  forcePathStyle: [{ required: true, message: "请选择 URL Style", trigger: "blur" }],
  bucket: [{ required: true, message: "请输入 Bucket", trigger: "blur" }],
};

const router = useRouter();

const submitForm = async () => {
  await formRef.value?.validate();
  try {
    await writeS3Access(formData.value);
    await writeS3Bucket(formData.value);
    await testConnection();
    await new Promise((resolve) => setTimeout(resolve, 600));
    await router.replace("/");
  } catch (error) {
    ElNotification({
      title: "保存失败",
      message: error instanceof Error ? error.message : "未知错误",
      type: "error",
    });
  }
};

const isConnected = refAutoReset(false, 2000);

const testConnection = async () => {
  const s3Service = await createS3Service();
  const command = new ListObjectsV2Command({ Bucket: formData.value.bucket, MaxKeys: 1 });
  const result = await s3Service.send(command);
  const { httpStatusCode } = result.$metadata;
  if (httpStatusCode !== 200) throw new Error(httpStatusCode?.toString() ?? "连接失败");
  ElNotification({
    title: "连接成功",
    message: `Bucket: ${formData.value.bucket}`,
    type: "success",
  });
  isConnected.value = true;
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
    <h3 class="form-title mb-4 flex items-center gap-1 pb-1 text-lg">
      <ITablerLockAccess class="text-xl" />
      S3 配置
    </h3>
    <ElFormItem label="Region" prop="region">
      <ElInput
        v-model.trim="formData.region"
        placeholder="请输入 Region"
        clearable
        autocomplete="new-password"
      />
    </ElFormItem>
    <ElFormItem label="Access Key ID" prop="credentials.accessKeyId">
      <ElInput
        :model-value="formData.credentials?.accessKeyId"
        placeholder="请输入 Access Key ID"
        clearable
        autocomplete="new-password"
        @update:model-value="set(formData, 'credentials.accessKeyId', $event.trim())"
      />
    </ElFormItem>
    <ElFormItem label="Secret Access Key" prop="credentials.secretAccessKey">
      <ElInput
        :model-value="formData.credentials?.secretAccessKey"
        type="password"
        placeholder="请输入 Secret Access Key"
        clearable
        show-password
        autocomplete="new-password"
        @update:model-value="set(formData, 'credentials.secretAccessKey', $event.trim())"
      />
    </ElFormItem>
    <ElFormItem label="Endpoint" prop="endpoint">
      <ElInput
        v-model.trim="formData.endpoint"
        placeholder="例如：https://s3.amazonaws.com 或 https://your-minio-server.com"
        clearable
        autocomplete="new-password"
      />
    </ElFormItem>
    <ElFormItem label="URL Style" prop="forcePathStyle">
      <ElRadioGroup v-model="formData.forcePathStyle">
        <ElRadio :value="true" label="Path Style" />
        <ElRadio :value="false" label="Virtual Host Style" />
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem label="Bucket" prop="bucket">
      <ElInput
        v-model.trim="formData.bucket"
        placeholder="请输入 Bucket"
        clearable
        autocomplete="new-password"
      />
    </ElFormItem>
    <div class="flex pt-2">
      <ElButton type="primary" class="submit-button" native-type="submit">
        <ITablerGavel v-if="!isConnected" class="mr-1 text-base" />
        <ITablerCheck v-else class="mr-1 text-base" />
        保存配置
      </ElButton>
    </div>
  </ElForm>
</template>

<style scoped>
.base-form {
  width: 400px;
  margin: 3rem auto;
}

.submit-button {
  width: 10rem;
}
</style>
