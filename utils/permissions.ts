interface Permission {
  description: string;
  dependencies?: string[];
}

interface SubFeature {
  description: string;
  permissions: Record<string, Permission>;
}

interface Feature {
  description: string;
  permissions: Record<string, SubFeature | Permission>;
}

interface Role {
  description: string;
  permissions: string[];
}

interface PermissionsData {
  roles: Record<string, Role>;
  features: Record<string, Feature>;
}

import permissionsData from "@/public/permissions.json";

export const permissions = permissionsData as PermissionsData;

export const getPermissionsForRole = (roleName: string): string[] => {
  const rolePermissions = permissions.roles[roleName]?.permissions || [];
  const resolvedPermissions = new Set<string>();

  rolePermissions.forEach((feature) => {
    resolveDependencies(feature, resolvedPermissions);
  });

  return Array.from(resolvedPermissions);
};

const resolveDependencies = (
  feature: string,
  resolvedPermissions: Set<string>
) => {
  const featureData = permissions.features[feature];
  if (featureData?.permissions) {
    Object.keys(featureData.permissions).forEach((subFeature) => {
      const subFeatureData = featureData.permissions[subFeature];
      if ("dependencies" in subFeatureData) {
        subFeatureData.dependencies?.forEach((dependency) => {
          if (!resolvedPermissions.has(dependency)) {
            resolvedPermissions.add(dependency);
            resolveDependencies(dependency, resolvedPermissions);
          }
        });
      }
    });
  }
};
