/**
 * 思拓智媒后台管理系统 - 数据库类型定义
 * 自动生成的类型，用于 Supabase 查询
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // ============================================
      // 用户与权限
      // ============================================
      users: {
        Row: {
          id: string
          openid: string | null
          unionid: string | null
          nickname: string | null
          avatar_url: string | null
          phone: string | null
          email: string | null
          user_role: 'free' | 'personal' | 'team'
          account_status: 'normal' | 'disabled' | 'blacklisted'
          register_time: string
          last_login_time: string | null
          remaining_minutes: number
          storage_used: number
          storage_limit: number
          vip_expire_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          openid?: string | null
          unionid?: string | null
          nickname?: string | null
          avatar_url?: string | null
          phone?: string | null
          email?: string | null
          user_role?: 'free' | 'personal' | 'team'
          account_status?: 'normal' | 'disabled' | 'blacklisted'
          register_time?: string
          last_login_time?: string | null
          remaining_minutes?: number
          storage_used?: number
          storage_limit?: number
          vip_expire_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          openid?: string | null
          unionid?: string | null
          nickname?: string | null
          avatar_url?: string | null
          phone?: string | null
          email?: string | null
          user_role?: 'free' | 'personal' | 'team' | null
          account_status?: 'normal' | 'disabled' | 'blacklisted' | null
          register_time?: string
          last_login_time?: string | null
          remaining_minutes?: number
          storage_used?: number
          storage_limit?: number
          vip_expire_time?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          username: string
          password_hash: string
          real_name: string | null
          email: string | null
          phone: string | null
          avatar_url: string | null
          role_id: string | null
          is_active: boolean
          last_login_time: string | null
          last_login_ip: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          password_hash: string
          real_name?: string | null
          email?: string | null
          phone?: string | null
          avatar_url?: string | null
          role_id?: string | null
          is_active?: boolean
          last_login_time?: string | null
          last_login_ip?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          password_hash?: string
          real_name?: string | null
          email?: string | null
          phone?: string | null
          avatar_url?: string | null
          role_id?: string | null
          is_active?: boolean
          last_login_time?: string | null
          last_login_ip?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_roles: {
        Row: {
          id: string
          role_name: string
          role_code: string
          description: string | null
          permissions: Json
          is_system: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          role_name: string
          role_code: string
          description?: string | null
          permissions?: Json
          is_system?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role_name?: string
          role_code?: string
          description?: string | null
          permissions?: Json
          is_system?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blacklists: {
        Row: {
          id: string
          user_id: string
          reason: string | null
          operator_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          reason?: string | null
          operator_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          reason?: string | null
          operator_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // ============================================
      // 模板管理
      // ============================================
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          category_id: string | null
          template_type: 'free' | 'vip'
          vip_permission: Json
          thumbnail_url: string | null
          video_url: string | null
          duration: number | null
          required_images: number
          required_videos: number
          required_text_length: number
          export_ratios: Json
          allow_custom_logo: boolean
          is_pinned: boolean
          status: 'draft' | 'pending' | 'active' | 'inactive'
          usage_count: number
          download_count: number
          conversion_rate: number
          sort_order: number
          created_by: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category_id?: string | null
          template_type?: 'free' | 'vip'
          vip_permission?: Json
          thumbnail_url?: string | null
          video_url?: string | null
          duration?: number | null
          required_images?: number
          required_videos?: number
          required_text_length?: number
          export_ratios?: Json
          allow_custom_logo?: boolean
          is_pinned?: boolean
          status?: 'draft' | 'pending' | 'active' | 'inactive'
          usage_count?: number
          download_count?: number
          conversion_rate?: number
          sort_order?: number
          created_by?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category_id?: string | null
          template_type?: 'free' | 'vip' | null
          vip_permission?: Json
          thumbnail_url?: string | null
          video_url?: string | null
          duration?: number | null
          required_images?: number
          required_videos?: number
          required_text_length?: number
          export_ratios?: Json
          allow_custom_logo?: boolean
          is_pinned?: boolean
          status?: 'draft' | 'pending' | 'active' | 'inactive' | null
          usage_count?: number
          download_count?: number
          conversion_rate?: number
          sort_order?: number
          created_by?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      template_categories: {
        Row: {
          id: string
          name: string
          parent_id: string | null
          sort_order: number
          icon_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          parent_id?: string | null
          sort_order?: number
          icon_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          parent_id?: string | null
          sort_order?: number
          icon_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      template_tags: {
        Row: {
          id: string
          tag_name: string
          color: string
          usage_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tag_name: string
          color?: string
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tag_name?: string
          color?: string
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      template_tags_relation: {
        Row: {
          id: string
          template_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          id?: string
          template_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          tag_id?: string
          created_at?: string
        }
      }

      // ============================================
      // 任务管理
      // ============================================
      render_tasks: {
        Row: {
          id: string
          user_id: string
          template_id: string
          task_status: 'pending' | 'processing' | 'completed' | 'failed' | 'terminated'
          progress: number
          input_data: Json | null
          output_video_url: string | null
          output_cover_url: string | null
          export_ratio: string
          export_resolution: string
          error_message: string | null
          error_stack: string | null
          processing_log: Json
          retry_count: number
          max_retries: number
          created_at: string
          started_at: string | null
          completed_at: string | null
          terminated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          task_status?: 'pending' | 'processing' | 'completed' | 'failed' | 'terminated'
          progress?: number
          input_data?: Json | null
          output_video_url?: string | null
          output_cover_url?: string | null
          export_ratio?: string
          export_resolution?: string
          error_message?: string | null
          error_stack?: string | null
          processing_log?: Json
          retry_count?: number
          max_retries?: number
          created_at?: string
          started_at?: string | null
          completed_at?: string | null
          terminated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          task_status?: 'pending' | 'processing' | 'completed' | 'failed' | 'terminated' | null
          progress?: number
          input_data?: Json | null
          output_video_url?: string | null
          output_cover_url?: string | null
          export_ratio?: string
          export_resolution?: string
          error_message?: string | null
          error_stack?: string | null
          processing_log?: Json
          retry_count?: number
          max_retries?: number
          created_at?: string
          started_at?: string | null
          completed_at?: string | null
          terminated_at?: string | null
        }
      }

      // ============================================
      // 素材管理
      // ============================================
      materials: {
        Row: {
          id: string
          name: string
          category_id: string | null
          material_type: 'image' | 'video' | 'audio'
          file_url: string
          thumbnail_url: string | null
          file_size: number | null
          duration: number | null
          width: number | null
          height: number | null
          tags: Json
          status: 'pending' | 'active' | 'inactive' | 'rejected'
          is_public: boolean
          uploader_id: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          rejection_reason: string | null
          usage_count: number
          download_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category_id?: string | null
          material_type: 'image' | 'video' | 'audio'
          file_url: string
          thumbnail_url?: string | null
          file_size?: number | null
          duration?: number | null
          width?: number | null
          height?: number | null
          tags?: Json
          status?: 'pending' | 'active' | 'inactive' | 'rejected'
          is_public?: boolean
          uploader_id?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          usage_count?: number
          download_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category_id?: string | null
          material_type?: 'image' | 'video' | 'audio' | null
          file_url?: string
          thumbnail_url?: string | null
          file_size?: number | null
          duration?: number | null
          width?: number | null
          height?: number | null
          tags?: Json
          status?: 'pending' | 'active' | 'inactive' | 'rejected' | null
          is_public?: boolean
          uploader_id?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          usage_count?: number
          download_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      material_categories: {
        Row: {
          id: string
          name: string
          parent_id: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_materials: {
        Row: {
          id: string
          user_id: string
          material_type: 'image' | 'video' | 'audio'
          file_url: string
          thumbnail_url: string | null
          file_size: number | null
          status: 'pending' | 'approved' | 'rejected' | 'violated'
          reviewed_by: string | null
          reviewed_at: string | null
          rejection_reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          material_type: 'image' | 'video' | 'audio'
          file_url: string
          thumbnail_url?: string | null
          file_size?: number | null
          status?: 'pending' | 'approved' | 'rejected' | 'violated'
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          material_type?: 'image' | 'video' | 'audio' | null
          file_url?: string
          thumbnail_url?: string | null
          file_size?: number | null
          status?: 'pending' | 'approved' | 'rejected' | 'violated' | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          created_at?: string
        }
      }

      // ============================================
      // 订单与商业化
      // ============================================
      packages: {
        Row: {
          id: string
          name: string
          package_type: 'personal' | 'team' | 'lifetime'
          duration_type: 'month' | 'quarter' | 'year' | 'lifetime'
          duration_value: number
          price: number
          original_price: number | null
          video_minutes: number
          storage_gb: number
          template_permission: Json
          tool_limits: Json
          export_permissions: Json
          additional_benefits: Json
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          package_type: 'personal' | 'team' | 'lifetime'
          duration_type: 'month' | 'quarter' | 'year' | 'lifetime'
          duration_value?: number
          price: number
          original_price?: number | null
          video_minutes: number
          storage_gb: number
          template_permission?: Json
          tool_limits?: Json
          export_permissions?: Json
          additional_benefits?: Json
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          package_type?: 'personal' | 'team' | 'lifetime' | null
          duration_type?: 'month' | 'quarter' | 'year' | 'lifetime' | null
          duration_value?: number
          price?: number
          original_price?: number | null
          video_minutes?: number
          storage_gb?: number
          template_permission?: Json
          tool_limits?: Json
          export_permissions?: Json
          additional_benefits?: Json
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      addons: {
        Row: {
          id: string
          name: string
          addon_type: 'minutes' | 'storage'
          value: number
          price: number
          validity_days: number
          max_purchase_limit: number
          description: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          addon_type: 'minutes' | 'storage'
          value: number
          price: number
          validity_days?: number
          max_purchase_limit?: number
          description?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          addon_type?: 'minutes' | 'storage' | null
          value?: number
          price?: number
          validity_days?: number
          max_purchase_limit?: number
          description?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_no: string
          user_id: string
          order_type: 'package' | 'addon'
          total_amount: number
          actual_amount: number
          payment_method: string | null
          payment_status: 'unpaid' | 'paid' | 'refunded' | 'failed'
          order_status: 'pending' | 'completed' | 'cancelled' | 'refunded'
          paid_at: string | null
          refunded_at: string | null
          refund_amount: number | null
          refund_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_no: string
          user_id: string
          order_type: 'package' | 'addon'
          total_amount: number
          actual_amount: number
          payment_method?: string | null
          payment_status?: 'unpaid' | 'paid' | 'refunded' | 'failed'
          order_status?: 'pending' | 'completed' | 'cancelled' | 'refunded'
          paid_at?: string | null
          refunded_at?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_no?: string
          user_id?: string
          order_type?: 'package' | 'addon' | null
          total_amount?: number
          actual_amount?: number
          payment_method?: string | null
          payment_status?: 'unpaid' | 'paid' | 'refunded' | 'failed' | null
          order_status?: 'pending' | 'completed' | 'cancelled' | 'refunded' | null
          paid_at?: string | null
          refunded_at?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          item_type: 'package' | 'addon'
          item_id: string
          item_name: string | null
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          item_type: 'package' | 'addon'
          item_id: string
          item_name?: string | null
          quantity?: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          item_type?: 'package' | 'addon' | null
          item_id?: string
          item_name?: string | null
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      user_packages: {
        Row: {
          id: string
          user_id: string
          package_id: string
          order_id: string
          start_time: string
          expire_time: string
          video_minutes_total: number
          video_minutes_used: number
          storage_gb_total: number
          additional_minutes: number
          additional_storage_gb: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          package_id: string
          order_id: string
          start_time?: string
          expire_time: string
          video_minutes_total: number
          video_minutes_used?: number
          storage_gb_total: number
          additional_minutes?: number
          additional_storage_gb?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          package_id?: string
          order_id?: string
          start_time?: string
          expire_time?: string
          video_minutes_total?: number
          video_minutes_used?: number
          storage_gb_total?: number
          additional_minutes?: number
          additional_storage_gb?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_addons: {
        Row: {
          id: string
          user_id: string
          addon_id: string
          order_id: string
          addon_type: 'minutes' | 'storage'
          value: number
          value_used: number
          expire_time: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          addon_id: string
          order_id: string
          addon_type: 'minutes' | 'storage'
          value: number
          value_used?: number
          expire_time: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          addon_id?: string
          order_id?: string
          addon_type?: 'minutes' | 'storage' | null
          value?: number
          value_used?: number
          expire_time?: string
          is_active?: boolean
          created_at?: string
        }
      }
      refund_requests: {
        Row: {
          id: string
          order_id: string
          user_id: string
          refund_amount: number
          reason: string | null
          status: 'pending' | 'approved' | 'rejected' | 'processing'
          reviewed_by: string | null
          reviewed_at: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          user_id: string
          refund_amount: number
          reason?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'processing'
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          user_id?: string
          refund_amount?: number
          reason?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'processing' | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // ============================================
      // 系统配置
      // ============================================
      system_configs: {
        Row: {
          id: string
          config_key: string
          config_value: string | null
          config_type: 'string' | 'number' | 'boolean' | 'json'
          description: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          config_key: string
          config_value?: string | null
          config_type?: 'string' | 'number' | 'boolean' | 'json'
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          config_key?: string
          config_value?: string | null
          config_type?: 'string' | 'number' | 'boolean' | 'json' | null
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      message_templates: {
        Row: {
          id: string
          template_code: string
          template_name: string
          template_type: 'notification' | 'email' | 'sms' | 'wx'
          title: string | null
          content: string
          variables: Json
          trigger_conditions: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          template_code: string
          template_name: string
          template_type: 'notification' | 'email' | 'sms' | 'wx'
          title?: string | null
          content: string
          variables?: Json
          trigger_conditions?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          template_code?: string
          template_name?: string
          template_type?: 'notification' | 'email' | 'sms' | 'wx' | null
          title?: string | null
          content?: string
          variables?: Json
          trigger_conditions?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_models: {
        Row: {
          id: string
          model_name: string
          model_code: string
          model_type: string | null
          api_endpoint: string | null
          daily_limit: number
          permission: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          model_name: string
          model_code: string
          model_type?: string | null
          api_endpoint?: string | null
          daily_limit?: number
          permission?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          model_name?: string
          model_code?: string
          model_type?: string | null
          api_endpoint?: string | null
          daily_limit?: number
          permission?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // ============================================
      // 日志与审计
      // ============================================
      operation_logs: {
        Row: {
          id: string
          operator_id: string | null
          operator_name: string | null
          operation_type: string
          resource_type: string | null
          resource_id: string | null
          operation_detail: Json
          ip_address: string | null
          user_agent: string | null
          status: 'success' | 'failed'
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          operator_id?: string | null
          operator_name?: string | null
          operation_type: string
          resource_type?: string | null
          resource_id?: string | null
          operation_detail?: Json
          ip_address?: string | null
          user_agent?: string | null
          status?: 'success' | 'failed'
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          operator_id?: string | null
          operator_name?: string | null
          operation_type?: string
          resource_type?: string | null
          resource_id?: string | null
          operation_detail?: Json
          ip_address?: string | null
          user_agent?: string | null
          status?: 'success' | 'failed' | null
          error_message?: string | null
          created_at?: string
        }
      }
      user_activity_logs: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          activity_detail: Json
          page_url: string | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          activity_detail?: Json
          page_url?: string | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          activity_detail?: Json
          page_url?: string | null
          ip_address?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// ============================================
// 通用类型定义
// ============================================

// 用户角色类型
export type UserRole = 'free' | 'personal' | 'team'
export type AccountStatus = 'normal' | 'disabled' | 'blacklisted'

// 模板相关类型
export type TemplateType = 'free' | 'vip'
export type TemplateStatus = 'draft' | 'pending' | 'active' | 'inactive'
export type MaterialType = 'image' | 'video' | 'audio'
export type MaterialStatus = 'pending' | 'active' | 'inactive' | 'rejected'

// 任务相关类型
export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'terminated'

// 订单相关类型
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed'
export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded'
export type PackageType = 'personal' | 'team' | 'lifetime'
export type DurationType = 'month' | 'quarter' | 'year' | 'lifetime'
export type AddonType = 'minutes' | 'storage'

// 退款相关类型
export type RefundStatus = 'pending' | 'approved' | 'rejected' | 'processing'

// 筛选参数类型
export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface UserFilterParams extends PaginationParams {
  nickname?: string
  phone?: string
  user_role?: UserRole
  account_status?: AccountStatus
  register_time_start?: string
  register_time_end?: string
}

export interface TemplateFilterParams extends PaginationParams {
  name?: string
  category_id?: string
  template_type?: TemplateType
  status?: TemplateStatus
}

export interface TaskFilterParams extends PaginationParams {
  task_status?: TaskStatus
  user_id?: string
  template_id?: string
  created_time_start?: string
  created_time_end?: string
}

export interface OrderFilterParams extends PaginationParams {
  payment_status?: PaymentStatus
  order_type?: 'package' | 'addon'
  user_id?: string
  created_time_start?: string
  created_time_end?: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 导出 Tables 类型别名，方便使用
export type Tables = Database['public']['Tables']
