import { computed, h } from 'vue'
import { Table, Button, Typography, Space, Popconfirm } from 'ant-design-vue'
import { CheckCircleOutlined, EditOutlined, EyeOutlined, StopOutlined, ExclamationCircleOutlined, FileTextOutlined } from '@ant-design/icons-vue'
import { useProductStore } from '../stores/product.store'
import { getI18n } from '../helpers/i18n.helper'
import type { Product } from '../types'
import type { TableColumnsType } from 'ant-design-vue'

export function useProductTableColumns(
  handleApprove: (product: Product) => Promise<void>,
  handleRequestChange: (product: Product) => void,
  handleUnpublish: (product: Product) => Promise<void>,
  handleView: (product: Product) => void,
  handleEdit: (product: Product) => void,
  handleViewAIReview: (product: Product) => void,
  hasAIReview: (product: Product) => boolean
) {
  const productStore = useProductStore()

  const columns = computed<TableColumnsType<Product>>(() => [
    {
      title: getI18n('productName'),
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      customRender: ({ record }: { record: Product }) => {
        return h(
          Typography.Text,
          {
            strong: true,
            onClick: () => handleEdit(record),
            style: {
              cursor: 'pointer',
              color: '#1890ff'
            },
            onMouseenter: (e: MouseEvent) => {
              const target = e.target as HTMLElement
              if (target) {
                target.style.textDecoration = 'underline'
              }
            },
            onMouseleave: (e: MouseEvent) => {
              const target = e.target as HTMLElement
              if (target) {
                target.style.textDecoration = 'none'
              }
            }
          },
          { default: () => record.name }
        )
      }
    },
    {
      title: getI18n('vendor'),
      dataIndex: 'vendor_name',
      key: 'vendor_name',
      width: '30%',
      customRender: ({ record }: { record: Product }) => {
        const vendorEditUrl = `?page=wcv-all-vendors#/vendor-edit/${record.vendor_id}`
        return h(
          Typography.Text,
          {
            onClick: () => {
              window.location.href = vendorEditUrl
            },
            style: {
              cursor: 'pointer',
              color: '#1890ff'
            },
            onMouseenter: (e: MouseEvent) => {
              const target = e.target as HTMLElement
              if (target) {
                target.style.textDecoration = 'underline'
              }
            },
            onMouseleave: (e: MouseEvent) => {
              const target = e.target as HTMLElement
              if (target) {
                target.style.textDecoration = 'none'
              }
            }
          },
          { default: () => record.vendor_name }
        )
      }
    },
    {
      title: getI18n('actions'),
      key: 'actions',
      width: '20%',
      align: 'right',
      customRender: ({ record }: { record: Product }) => {
        const actions: any[] = []

        // Add View AI Review button if product has AI review
        if (hasAIReview(record)) {
          actions.push(
            h(
              Button,
              {
                type: 'link',
                size: 'small',
                icon: h(FileTextOutlined),
                onClick: () => handleViewAIReview(record),
                class: 'btn-ai-review'
              },
              { default: () => getI18n('viewAIReview') || 'View AI Review' }
            )
          )
        }

        if (record.status === 'pending') {
          // Pending products: Approve and Request Change
          actions.push(
            h(
              Button,
              {
                type: 'primary',
                size: 'small',
                icon: h(CheckCircleOutlined),
                onClick: () => handleApprove(record),
                loading: productStore.isLoading
              },
              { default: () => getI18n('approve') }
            ),
            h(
              Button,
              {
                type: 'default',
                size: 'small',
                icon: h(ExclamationCircleOutlined),
                onClick: () => handleRequestChange(record),
                loading: productStore.isLoading,
                class: 'btn-request-change'
              },
              { default: () => getI18n('requestChange') }
            )
          )
        } else if (record.status === 'publish') {
          // Published products: View, Edit, Unpublish
          actions.push(
            h(
              Button,
              {
                type: 'link',
                size: 'small',
                icon: h(EyeOutlined),
                onClick: () => handleView(record),
                class: 'btn-view'
              },
              { default: () => getI18n('view') }
            ),
            h(
              Button,
              {
                type: 'link',
                size: 'small',
                icon: h(EditOutlined),
                onClick: () => handleEdit(record),
                class: 'btn-edit'
              },
              { default: () => getI18n('edit') }
            ),
            h(
              Popconfirm,
              {
                title: getI18n('confirmUnpublish') || 'Are you sure you want to unpublish this product?',
                okText: getI18n('yes') || 'Yes',
                cancelText: getI18n('no') || 'No',
                onConfirm: () => handleUnpublish(record)
              },
              {
                default: () => h(
                  Button,
                  {
                    type: 'link',
                    size: 'small',
                    icon: h(StopOutlined),
                    danger: true,
                    loading: productStore.isLoading
                  },
                  { default: () => getI18n('unpublish') }
                )
              }
            )
          )
        } else if (record.status === 'draft') {
          // Draft products: Edit, Publish
          actions.push(
            h(
              Button,
              {
                type: 'link',
                size: 'small',
                icon: h(EditOutlined),
                onClick: () => handleEdit(record),
                class: 'btn-edit'
              },
              { default: () => getI18n('edit') }
            ),
            h(
              Button,
              {
                type: 'primary',
                size: 'small',
                icon: h(CheckCircleOutlined),
                onClick: () => handleApprove(record),
                loading: productStore.isLoading
              },
              { default: () => getI18n('approve') }
            )
          )
        }

        return h(Space, {
          size: 'small',
          wrap: false,
          align: 'end'
        }, { default: () => actions })
      }
    }
  ])

  return { columns }
}
